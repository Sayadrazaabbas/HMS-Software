import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GetMedicinesParams {
    page: number;
    limit: number;
    search?: string;
    category?: string;
}

interface DispenseInput {
    patientId: string;
    prescriptionId?: string;
    items: {
        medicineId: string;
        quantity: number;
        instructions?: string;
    }[];
    notes?: string;
}

/**
 * Get all medicines with pagination and search
 */
export const getMedicines = async ({ page, limit, search, category }: GetMedicinesParams) => {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { genericName: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (category) {
        where.category = category;
    }

    const [data, total] = await Promise.all([
        prisma.medicine.findMany({
            where,
            skip,
            take: limit,
            orderBy: { name: 'asc' },
            include: {
                stock: {
                    orderBy: { expiryDate: 'asc' },
                    take: 1,
                },
            },
        }),
        prisma.medicine.count({ where }),
    ]);

    // Add computed stock quantities
    const dataWithStock = data.map(medicine => {
        const totalStock = medicine.stock.reduce((sum, s) => sum + s.quantity, 0);
        return {
            ...medicine,
            stockQuantity: totalStock,
            isLowStock: totalStock < (medicine.minStock || 10),
        };
    });

    return {
        data: dataWithStock,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

/**
 * Get medicine by ID
 */
export const getMedicineById = async (id: string) => {
    return prisma.medicine.findUnique({
        where: { id },
        include: {
            stock: {
                orderBy: { expiryDate: 'asc' },
            },
        },
    });
};

/**
 * Get stock status overview
 */
export const getStockOverview = async () => {
    const medicines = await prisma.medicine.findMany({
        include: {
            stock: true,
        },
    });

    let totalItems = 0;
    let lowStockItems = 0;
    let outOfStockItems = 0;
    let expiringItems = 0;

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    medicines.forEach(medicine => {
        const totalStock = medicine.stock.reduce((sum, s) => sum + s.quantity, 0);
        totalItems++;

        if (totalStock === 0) {
            outOfStockItems++;
        } else if (totalStock < (medicine.minStock || 10)) {
            lowStockItems++;
        }

        // Check for expiring stock
        const hasExpiring = medicine.stock.some(s =>
            s.expiryDate && new Date(s.expiryDate) <= thirtyDaysFromNow && s.quantity > 0
        );
        if (hasExpiring) {
            expiringItems++;
        }
    });

    return {
        totalItems,
        lowStockItems,
        outOfStockItems,
        expiringItems,
    };
};

/**
 * Get low stock medicines
 */
export const getLowStock = async () => {
    const medicines = await prisma.medicine.findMany({
        include: {
            stock: true,
        },
    });

    return medicines.filter(medicine => {
        const totalStock = medicine.stock.reduce((sum, s) => sum + s.quantity, 0);
        return totalStock < (medicine.minStock || 10);
    }).map(medicine => ({
        ...medicine,
        stockQuantity: medicine.stock.reduce((sum, s) => sum + s.quantity, 0),
    }));
};

/**
 * Dispense medicine
 */
export const dispenseMedicine = async (data: DispenseInput) => {
    // Verify patient exists
    const patient = await prisma.patient.findUnique({
        where: { id: data.patientId },
    });

    if (!patient) {
        throw new Error('Patient not found');
    }

    // Process each item
    const dispensedItems = [];

    for (const item of data.items) {
        const medicine = await prisma.medicine.findUnique({
            where: { id: item.medicineId },
            include: {
                stock: {
                    where: { quantity: { gt: 0 } },
                    orderBy: { expiryDate: 'asc' }, // FIFO by expiry
                },
            },
        });

        if (!medicine) {
            throw new Error(`Medicine ${item.medicineId} not found`);
        }

        const totalStock = medicine.stock.reduce((sum, s) => sum + s.quantity, 0);
        if (totalStock < item.quantity) {
            throw new Error(`Insufficient stock for ${medicine.name}`);
        }

        // Deduct from stock (FIFO)
        let remaining = item.quantity;
        for (const stock of medicine.stock) {
            if (remaining <= 0) break;

            const deductAmount = Math.min(remaining, stock.quantity);
            await prisma.medicineStock.update({
                where: { id: stock.id },
                data: { quantity: stock.quantity - deductAmount },
            });
            remaining -= deductAmount;
        }

        dispensedItems.push({
            medicineId: medicine.id,
            medicineName: medicine.name,
            quantity: item.quantity,
            unitPrice: medicine.sellingPrice || 0,
            amount: (medicine.sellingPrice || 0) * item.quantity,
        });
    }

    return {
        patientId: data.patientId,
        patientName: patient.name,
        dispensedAt: new Date(),
        items: dispensedItems,
        totalAmount: dispensedItems.reduce((sum, i) => sum + i.amount, 0),
    };
};

/**
 * Get prescriptions for a patient
 */
export const getPrescriptions = async (patientId?: string) => {
    const where: any = {};
    if (patientId) {
        where.visit = {
            patientId,
        };
    }

    return prisma.prescription.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
            visit: {
                include: {
                    patient: {
                        select: { id: true, patientId: true, name: true },
                    },
                    doctor: {
                        include: {
                            user: { select: { name: true } },
                        },
                    },
                },
            },
            items: {
                include: {
                    medicine: {
                        select: { name: true, genericName: true },
                    },
                },
            },
        },
    });
};
