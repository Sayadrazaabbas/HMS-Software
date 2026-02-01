import { Request, Response } from 'express';
import * as patientService from '../services/patient.service';
import { success, error } from '../utils/response';

/**
 * GET /api/v1/patients
 * Get all patients with pagination and search
 */
export const getAll = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, search } = req.query;

        const result = await patientService.getAll({
            page: Number(page),
            limit: Number(limit),
            search: search as string,
        });

        return success(res, result.data, 'Patients retrieved successfully', 200, result.pagination);
    } catch (err: any) {
        console.error('[PatientController.getAll]', err);
        return error(res, 'Failed to fetch patients', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/patients/:id
 * Get patient by ID
 */
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const patient = await patientService.getById(id);

        if (!patient) {
            return error(res, 'Patient not found', 404, 'NOT_FOUND');
        }

        return success(res, patient, 'Patient retrieved successfully');
    } catch (err: any) {
        console.error('[PatientController.getById]', err);
        return error(res, 'Failed to fetch patient', 500, 'INTERNAL_ERROR');
    }
};

/**
 * POST /api/v1/patients
 * Create new patient
 */
export const create = async (req: Request, res: Response) => {
    try {
        const { name, phone, gender, ...rest } = req.body;

        // Basic validation
        if (!name || !phone || !gender) {
            return error(res, 'Name, phone, and gender are required', 400, 'VALIDATION_ERROR');
        }

        const patient = await patientService.create({ name, phone, gender, ...rest });
        return success(res, patient, 'Patient created successfully', 201);
    } catch (err: any) {
        console.error('[PatientController.create]', err);

        if (err.code === 'P2002') {
            return error(res, 'Patient with this phone/ABHA ID already exists', 400, 'DUPLICATE_ENTRY');
        }

        return error(res, err.message || 'Failed to create patient', 400, 'VALIDATION_ERROR');
    }
};

/**
 * PUT /api/v1/patients/:id
 * Update patient
 */
export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const patient = await patientService.update(id, req.body);
        return success(res, patient, 'Patient updated successfully');
    } catch (err: any) {
        console.error('[PatientController.update]', err);

        if (err.code === 'P2025') {
            return error(res, 'Patient not found', 404, 'NOT_FOUND');
        }

        return error(res, err.message || 'Failed to update patient', 400, 'VALIDATION_ERROR');
    }
};

/**
 * DELETE /api/v1/patients/:id
 * Delete patient
 */
export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await patientService.remove(id);
        return success(res, null, 'Patient deleted successfully');
    } catch (err: any) {
        console.error('[PatientController.remove]', err);

        if (err.message.includes('Cannot delete')) {
            return error(res, err.message, 400, 'CONSTRAINT_ERROR');
        }

        return error(res, 'Failed to delete patient', 500, 'INTERNAL_ERROR');
    }
};
