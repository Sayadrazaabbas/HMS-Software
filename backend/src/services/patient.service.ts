import { PrismaClient, Gender, BloodGroup } from '@prisma/client';

const prisma = new PrismaClient();

interface GetAllParams {
    page: number;
    limit: number;
    search?: string;
}

interface CreatePatientInput {
    name: string;
    phone: string;
    email?: string;
    dateOfBirth?: Date;
    age?: number;
    gender: Gender;
    bloodGroup?: BloodGroup;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    abhaId?: string;
    emergencyName?: string;
    emergencyPhone?: string;
    allergies?: string;
    chronicConditions?: string[];
}

/**
 * Generate patient ID in format P-YYYY-XXXX
 */
const generatePatientId = async (): Promise<string> => {
    const year = new Date().getFullYear();
    const prefix = `P-${year}-`;

    // Find the last patient ID for this year
    const lastPatient = await prisma.patient.findFirst({
        where: {
            patientId: {
                startsWith: prefix,
            },
        },
        orderBy: {
            patientId: 'desc',
        },
    });

    let nextNumber = 1;
    if (lastPatient) {
        const lastNumber = parseInt(lastPatient.patientId.split('-')[2]);
        nextNumber = lastNumber + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
};

/**
 * Get all patients with pagination and search
 */
export const getAll = async ({ page, limit, search }: GetAllParams) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { phone: { contains: search } },
                { patientId: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } },
            ],
        }
        : {};

    const [data, total] = await Promise.all([
        prisma.patient.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                patientId: true,
                name: true,
                phone: true,
                email: true,
                age: true,
                gender: true,
                bloodGroup: true,
                city: true,
                createdAt: true,
            },
        }),
        prisma.patient.count({ where }),
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
 * Get patient by ID with full details
 */
export const getById = async (id: string) => {
    return prisma.patient.findUnique({
        where: { id },
        include: {
            appointments: {
                orderBy: { date: 'desc' },
                take: 5,
                include: {
                    doctor: {
                        include: {
                            user: { select: { name: true } },
                            department: { select: { name: true } },
                        },
                    },
                },
            },
            invoices: {
                orderBy: { createdAt: 'desc' },
                take: 5,
                select: {
                    id: true,
                    invoiceNo: true,
                    totalAmount: true,
                    dueAmount: true,
                    status: true,
                    createdAt: true,
                },
            },
            visits: {
                orderBy: { visitDate: 'desc' },
                take: 5,
                include: {
                    doctor: {
                        include: {
                            user: { select: { name: true } },
                        },
                    },
                },
            },
        },
    });
};

/**
 * Create new patient
 */
export const create = async (data: CreatePatientInput) => {
    const patientId = await generatePatientId();

    return prisma.patient.create({
        data: {
            ...data,
            patientId,
        },
    });
};

/**
 * Update patient
 */
export const update = async (id: string, data: Partial<CreatePatientInput>) => {
    return prisma.patient.update({
        where: { id },
        data,
    });
};

/**
 * Delete patient
 */
export const remove = async (id: string) => {
    // Check if patient has any appointments or invoices
    const patient = await prisma.patient.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    appointments: true,
                    invoices: true,
                    admissions: true,
                },
            },
        },
    });

    if (!patient) {
        throw new Error('Patient not found');
    }

    if (patient._count.appointments > 0 || patient._count.invoices > 0 || patient._count.admissions > 0) {
        throw new Error('Cannot delete patient with existing medical records');
    }

    return prisma.patient.delete({ where: { id } });
};
