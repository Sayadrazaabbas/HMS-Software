import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DashboardStats {
    todayPatients: number;
    todayAppointments: number;
    pendingBills: number;
    todayRevenue: number;
    totalPatients: number;
    totalDoctors: number;
    availableBeds: number;
    occupiedBeds: number;
}

/**
 * Get dashboard statistics
 */
export const getStats = async (): Promise<DashboardStats> => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Run all queries in parallel for performance
    const [
        todayPatients,
        todayAppointments,
        pendingBills,
        todayRevenueResult,
        totalPatients,
        totalDoctors,
        availableBeds,
        occupiedBeds,
    ] = await Promise.all([
        // Today's new patients
        prisma.patient.count({
            where: {
                createdAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        }),
        // Today's appointments
        prisma.appointment.count({
            where: {
                date: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        }),
        // Pending invoices count
        prisma.invoice.count({
            where: {
                status: 'PENDING',
            },
        }),
        // Today's revenue
        prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                receivedAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        }),
        // Total patients
        prisma.patient.count(),
        // Total doctors
        prisma.doctor.count(),
        // Available beds
        prisma.bed.count({
            where: {
                status: 'AVAILABLE',
            },
        }),
        // Occupied beds
        prisma.bed.count({
            where: {
                status: 'OCCUPIED',
            },
        }),
    ]);

    return {
        todayPatients,
        todayAppointments,
        pendingBills,
        todayRevenue: Number(todayRevenueResult._sum.amount) || 0,
        totalPatients,
        totalDoctors,
        availableBeds,
        occupiedBeds,
    };
};

/**
 * Get recent patients
 */
export const getRecentPatients = async (limit = 5) => {
    return prisma.patient.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: limit,
        select: {
            id: true,
            patientId: true,
            name: true,
            phone: true,
            gender: true,
            age: true,
            createdAt: true,
        },
    });
};

/**
 * Get today's appointments
 */
export const getTodayAppointments = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return prisma.appointment.findMany({
        where: {
            date: {
                gte: today,
                lt: tomorrow,
            },
        },
        include: {
            patient: {
                select: {
                    id: true,
                    patientId: true,
                    name: true,
                    phone: true,
                },
            },
            doctor: {
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    department: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            startTime: 'asc',
        },
        take: 10,
    });
};
