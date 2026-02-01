import { PrismaClient, InvoiceStatus, PaymentMode, InvoiceType } from '@prisma/client';

const prisma = new PrismaClient();

interface GetAllParams {
    page: number;
    limit: number;
    status?: InvoiceStatus;
    patientId?: string;
}

interface CreateInvoiceInput {
    patientId: string;
    visitId?: string;
    items: {
        serviceId?: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number;
    }[];
    discount?: number;
    tax?: number;
}

interface AddPaymentInput {
    invoiceId: string;
    amount: number;
    method: PaymentMode;
    reference?: string;
    notes?: string;
}

/**
 * Generate invoice number in format INV-YYYYMMDD-XXXX
 */
const generateInvoiceNo = async (): Promise<string> => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const prefix = `INV-${dateStr}-`;

    const lastInvoice = await prisma.invoice.findFirst({
        where: {
            invoiceNo: {
                startsWith: prefix,
            },
        },
        orderBy: {
            invoiceNo: 'desc',
        },
    });

    let nextNumber = 1;
    if (lastInvoice) {
        const lastNumber = parseInt(lastInvoice.invoiceNo.split('-')[2]);
        nextNumber = lastNumber + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
};

/**
 * Generate payment ID in format PAY-YYYYMMDD-XXXX
 */
const generatePaymentId = async (): Promise<string> => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const prefix = `PAY-${dateStr}-`;

    const lastPayment = await prisma.payment.findFirst({
        where: {
            paymentId: {
                startsWith: prefix,
            },
        },
        orderBy: {
            paymentId: 'desc',
        },
    });

    let nextNumber = 1;
    if (lastPayment) {
        const lastNumber = parseInt(lastPayment.paymentId.split('-')[2]);
        nextNumber = lastNumber + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
};

/**
 * Get all invoices with filters and pagination
 */
export const getAll = async ({ page, limit, status, patientId }: GetAllParams) => {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
        where.status = status;
    }

    if (patientId) {
        where.patientId = patientId;
    }

    const [data, total] = await Promise.all([
        prisma.invoice.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                patient: {
                    select: {
                        id: true,
                        patientId: true,
                        name: true,
                        phone: true,
                    },
                },
                items: true,
                payments: {
                    orderBy: { receivedAt: 'desc' },
                    take: 1,
                },
            },
        }),
        prisma.invoice.count({ where }),
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

/**
 * Get invoice by ID
 */
export const getById = async (id: string) => {
    return prisma.invoice.findUnique({
        where: { id },
        include: {
            patient: true,
            items: true,
            payments: {
                orderBy: { receivedAt: 'desc' },
            },
        },
    });
};

/**
 * Create new invoice
 */
export const create = async (data: CreateInvoiceInput) => {
    const invoiceNo = await generateInvoiceNo();

    // Calculate totals
    let subtotal = 0;
    const itemsData = data.items.map(item => {
        const amount = item.quantity * item.unitPrice - (item.discount || 0);
        subtotal += amount;
        return {
            itemType: 'SERVICE',
            itemId: item.serviceId,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: amount
        };
    });

    const discountAmount = data.discount || 0;
    const taxAmount = data.tax || 0;
    const totalAmount = subtotal - discountAmount + taxAmount;

    // Fetch a fallback user for createdById if available
    const systemUser = await prisma.user.findFirst();
    const createdById = systemUser?.id || '';

    return prisma.invoice.create({
        data: {
            invoiceNo,
            patientId: data.patientId,
            // visitId: data.visitId, // visitId does not exist on Invoice model!
            invoiceType: InvoiceType.OPD,
            subtotal,
            discountValue: discountAmount,
            taxAmount: taxAmount,
            totalAmount,
            dueAmount: totalAmount,
            status: 'PENDING',
            createdById,
            items: {
                create: itemsData,
            },
        },
        include: {
            patient: {
                select: { id: true, patientId: true, name: true },
            },
            items: true,
        },
    });
};

/**
 * Add payment to invoice
 */
export const addPayment = async (data: AddPaymentInput) => {
    const invoice = await prisma.invoice.findUnique({
        where: { id: data.invoiceId },
    });

    if (!invoice) {
        throw new Error('Invoice not found');
    }

    const paymentId = await generatePaymentId();

    const currentDue = Number(invoice.dueAmount);
    const newDueAmount = currentDue - data.amount;
    const newStatus: InvoiceStatus = newDueAmount <= 0 ? 'PAID' : 'PARTIAL';

    // Create payment and update invoice in a transaction
    const result = await prisma.$transaction([
        prisma.payment.create({
            data: {
                paymentId,
                invoiceId: data.invoiceId,
                amount: data.amount,
                paymentMode: data.method,
                reference: data.reference,
                // notes: data.notes, // does not exist on Payment model
                receivedAt: new Date(),
            },
        }),
        prisma.invoice.update({
            where: { id: data.invoiceId },
            data: {
                dueAmount: Math.max(0, newDueAmount),
                status: newStatus,
            },
        }),
    ]);

    return result[0]; // Return payment
};

/**
 * Get today's revenue
 */
export const getTodayRevenue = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
            receivedAt: {
                gte: today,
                lt: tomorrow,
            },
        },
    });

    return result._sum.amount || 0;
};

/**
 * Get pending invoices count
 */
export const getPendingCount = async () => {
    return prisma.invoice.count({
        where: {
            status: { in: ['PENDING', 'PARTIAL'] },
        },
    });
};

/**
 * Get all services for billing
 */
export const getServices = async () => {
    return prisma.service.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
    });
};

/**
 * Cancel invoice
 */
export const cancelInvoice = async (id: string) => {
    return prisma.invoice.update({
        where: { id },
        data: { status: 'CANCELLED' },
    });
};
