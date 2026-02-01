import { PrismaClient, AppointmentStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface GetAllParams {
    page: number;
    limit: number;
    date?: string;
    doctorId?: string;
    status?: AppointmentStatus;
}

interface CreateAppointmentInput {
    patientId: string;
    doctorId: string;
    date: Date;
    startTime: string;
    endTime?: string;
    type: 'NEW' | 'FOLLOWUP' | 'EMERGENCY';
    reason?: string;
    notes?: string;
}

/**
 * Generate appointment ID in format APT-YYYYMMDD-XXXX
 */
const generateAppointmentId = async (): Promise<string> => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const prefix = `APT-${dateStr}-`;

    const lastAppointment = await prisma.appointment.findFirst({
        where: {
            appointmentId: {
                startsWith: prefix,
            },
        },
        orderBy: {
            appointmentId: 'desc',
        },
    });

    let nextNumber = 1;
    if (lastAppointment) {
        const lastNumber = parseInt(lastAppointment.appointmentId.split('-')[2]);
        nextNumber = lastNumber + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
};

/**
 * Get all appointments with filters and pagination
 */
export const getAll = async ({ page, limit, date, doctorId, status }: GetAllParams) => {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        where.date = {
            gte: startOfDay,
            lte: endOfDay,
        };
    }

    if (doctorId) {
        where.doctorId = doctorId;
    }

    if (status) {
        where.status = status;
    }

    const [data, total] = await Promise.all([
        prisma.appointment.findMany({
            where,
            skip,
            take: limit,
            orderBy: [{ date: 'desc' }, { startTime: 'asc' }],
            include: {
                patient: {
                    select: {
                        id: true,
                        patientId: true,
                        name: true,
                        phone: true,
                        gender: true,
                        age: true,
                    },
                },
                doctor: {
                    include: {
                        user: {
                            select: { name: true },
                        },
                        department: {
                            select: { name: true },
                        },
                    },
                },
            },
        }),
        prisma.appointment.count({ where }),
    ]);

    // Map appointmentId to appointmentNo for frontend compatibility
    const mappedData = data.map(apt => ({
        ...apt,
        appointmentNo: apt.appointmentId,
        tokenNo: 1, // Default token
    }));

    return {
        data: mappedData,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};

/**
 * Get appointment by ID
 */
export const getById = async (id: string) => {
    return prisma.appointment.findUnique({
        where: { id },
        include: {
            patient: true,
            doctor: {
                include: {
                    user: { select: { name: true } },
                    department: { select: { name: true } },
                },
            },
        },
    });
};

/**
 * Get today's appointments for a doctor
 */
export const getTodayByDoctor = async (doctorId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return prisma.appointment.findMany({
        where: {
            doctorId,
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
        },
        orderBy: { startTime: 'asc' },
    });
};

/**
 * Create new appointment
 */
export const create = async (data: CreateAppointmentInput) => {
    const appointmentId = await generateAppointmentId();

    return prisma.appointment.create({
        data: {
            appointmentId,
            patientId: data.patientId,
            doctorId: data.doctorId,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime || '',
            type: data.type,
            reason: data.reason,
            notes: data.notes,
            status: 'SCHEDULED',
        },
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
    });
};

/**
 * Update appointment status
 */
export const updateStatus = async (id: string, status: AppointmentStatus) => {
    return prisma.appointment.update({
        where: { id },
        data: { status },
    });
};

/**
 * Update appointment
 */
export const update = async (id: string, data: Partial<CreateAppointmentInput>) => {
    const updateData: any = {};
    if (data.date) updateData.date = data.date;
    if (data.startTime) updateData.startTime = data.startTime;
    if (data.endTime) updateData.endTime = data.endTime;
    if (data.type) updateData.type = data.type;
    if (data.reason) updateData.reason = data.reason;
    if (data.notes) updateData.notes = data.notes;

    return prisma.appointment.update({
        where: { id },
        data: updateData,
    });
};

/**
 * Cancel appointment
 */
export const cancel = async (id: string) => {
    return prisma.appointment.update({
        where: { id },
        data: { status: 'CANCELLED' },
    });
};

/**
 * Get available slots for a doctor on a date
 */
export const getAvailableSlots = async (doctorId: string, date: string) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.getDay();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    // Get doctor's schedule for that day
    const schedule = await prisma.doctorSchedule.findFirst({
        where: {
            doctorId,
            dayOfWeek: dayNames[dayOfWeek] as any,
        },
    });

    if (!schedule) {
        // Default slots if no schedule found
        return ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
    }

    // Get existing appointments
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await prisma.appointment.findMany({
        where: {
            doctorId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
            status: { not: 'CANCELLED' },
        },
        select: { startTime: true },
    });

    const bookedSlots = existingAppointments.map(a => a.startTime);

    // Generate 30-minute slots
    const slots: string[] = [];
    const [startHour, startMin] = schedule.startTime.split(':').map(Number);
    const [endHour, endMin] = schedule.endTime.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
        const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
        if (!bookedSlots.includes(timeStr)) {
            slots.push(timeStr);
        }
        currentMin += 30;
        if (currentMin >= 60) {
            currentMin = 0;
            currentHour++;
        }
    }

    return slots;
};

/**
 * Get doctors list
 */
export const getDoctors = async () => {
    return prisma.doctor.findMany({
        include: {
            user: { select: { name: true } },
            department: { select: { name: true } },
        },
    });
};
