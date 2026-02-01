import { Request, Response } from 'express';
import * as appointmentService from '../services/appointment.service';
import { success, error } from '../utils/response';

/**
 * GET /api/v1/appointments
 * Get all appointments with filters
 */
export const getAll = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, date, doctorId, status } = req.query;

        const result = await appointmentService.getAll({
            page: Number(page),
            limit: Number(limit),
            date: date as string,
            doctorId: doctorId as string,
            status: status as any,
        });

        return success(res, result.data, 'Appointments retrieved successfully', 200, result.pagination);
    } catch (err: any) {
        console.error('[AppointmentController.getAll]', err);
        return error(res, 'Failed to fetch appointments', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/appointments/:id
 * Get appointment by ID
 */
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentService.getById(id);

        if (!appointment) {
            return error(res, 'Appointment not found', 404, 'NOT_FOUND');
        }

        return success(res, appointment, 'Appointment retrieved successfully');
    } catch (err: any) {
        console.error('[AppointmentController.getById]', err);
        return error(res, 'Failed to fetch appointment', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/appointments/today/:doctorId
 * Get today's appointments for a doctor
 */
export const getTodayByDoctor = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params;
        const appointments = await appointmentService.getTodayByDoctor(doctorId);
        return success(res, appointments, 'Today appointments retrieved successfully');
    } catch (err: any) {
        console.error('[AppointmentController.getTodayByDoctor]', err);
        return error(res, 'Failed to fetch appointments', 500, 'INTERNAL_ERROR');
    }
};

/**
 * POST /api/v1/appointments
 * Create new appointment
 */
export const create = async (req: Request, res: Response) => {
    try {
        const { patientId, doctorId, date, startTime, type, reason, notes } = req.body;

        // Basic validation
        if (!patientId || !doctorId || !date || !startTime || !type) {
            return error(res, 'Patient, doctor, date, time and type are required', 400, 'VALIDATION_ERROR');
        }

        const appointment = await appointmentService.create({
            patientId,
            doctorId,
            date: new Date(date),
            startTime,
            type,
            reason,
            notes,
        });

        return success(res, appointment, 'Appointment created successfully', 201);
    } catch (err: any) {
        console.error('[AppointmentController.create]', err);
        return error(res, err.message || 'Failed to create appointment', 400, 'VALIDATION_ERROR');
    }
};

/**
 * PATCH /api/v1/appointments/:id/status
 * Update appointment status
 */
export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return error(res, 'Status is required', 400, 'VALIDATION_ERROR');
        }

        const appointment = await appointmentService.updateStatus(id, status);
        return success(res, appointment, 'Appointment status updated successfully');
    } catch (err: any) {
        console.error('[AppointmentController.updateStatus]', err);

        if (err.code === 'P2025') {
            return error(res, 'Appointment not found', 404, 'NOT_FOUND');
        }

        return error(res, 'Failed to update appointment status', 500, 'INTERNAL_ERROR');
    }
};

/**
 * PUT /api/v1/appointments/:id
 * Update appointment
 */
export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await appointmentService.update(id, req.body);
        return success(res, appointment, 'Appointment updated successfully');
    } catch (err: any) {
        console.error('[AppointmentController.update]', err);

        if (err.code === 'P2025') {
            return error(res, 'Appointment not found', 404, 'NOT_FOUND');
        }

        return error(res, err.message || 'Failed to update appointment', 400, 'VALIDATION_ERROR');
    }
};

/**
 * DELETE /api/v1/appointments/:id
 * Cancel appointment
 */
export const cancel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await appointmentService.cancel(id);
        return success(res, null, 'Appointment cancelled successfully');
    } catch (err: any) {
        console.error('[AppointmentController.cancel]', err);

        if (err.code === 'P2025') {
            return error(res, 'Appointment not found', 404, 'NOT_FOUND');
        }

        return error(res, 'Failed to cancel appointment', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/appointments/slots
 * Get available slots for a doctor on a date
 */
export const getAvailableSlots = async (req: Request, res: Response) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return error(res, 'Doctor ID and date are required', 400, 'VALIDATION_ERROR');
        }

        const slots = await appointmentService.getAvailableSlots(doctorId as string, date as string);
        return success(res, slots, 'Available slots retrieved successfully');
    } catch (err: any) {
        console.error('[AppointmentController.getAvailableSlots]', err);
        return error(res, 'Failed to fetch available slots', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/appointments/doctors
 * Get list of doctors for appointment booking
 */
export const getDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await appointmentService.getDoctors();
        return success(res, doctors, 'Doctors retrieved successfully');
    } catch (err: any) {
        console.error('[AppointmentController.getDoctors]', err);
        return error(res, 'Failed to fetch doctors', 500, 'INTERNAL_ERROR');
    }
};
