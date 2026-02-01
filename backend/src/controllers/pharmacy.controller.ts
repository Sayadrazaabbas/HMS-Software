import { Request, Response } from 'express';
import * as pharmacyService from '../services/pharmacy.service';
import { success, error } from '../utils/response';

/**
 * GET /api/v1/pharmacy/medicines
 * Get all medicines
 */
export const getMedicines = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, search, category } = req.query;

        const result = await pharmacyService.getMedicines({
            page: Number(page),
            limit: Number(limit),
            search: search as string,
            category: category as string,
        });

        return success(res, result.data, 'Medicines retrieved successfully', 200, result.pagination);
    } catch (err: any) {
        console.error('[PharmacyController.getMedicines]', err);
        return error(res, 'Failed to fetch medicines', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/pharmacy/medicines/:id
 * Get medicine by ID
 */
export const getMedicineById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const medicine = await pharmacyService.getMedicineById(id);

        if (!medicine) {
            return error(res, 'Medicine not found', 404, 'NOT_FOUND');
        }

        return success(res, medicine, 'Medicine retrieved successfully');
    } catch (err: any) {
        console.error('[PharmacyController.getMedicineById]', err);
        return error(res, 'Failed to fetch medicine', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/pharmacy/stock
 * Get stock overview
 */
export const getStockOverview = async (req: Request, res: Response) => {
    try {
        const overview = await pharmacyService.getStockOverview();
        return success(res, overview, 'Stock overview retrieved successfully');
    } catch (err: any) {
        console.error('[PharmacyController.getStockOverview]', err);
        return error(res, 'Failed to fetch stock overview', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/pharmacy/stock/low
 * Get low stock medicines
 */
export const getLowStock = async (req: Request, res: Response) => {
    try {
        const medicines = await pharmacyService.getLowStock();
        return success(res, medicines, 'Low stock medicines retrieved successfully');
    } catch (err: any) {
        console.error('[PharmacyController.getLowStock]', err);
        return error(res, 'Failed to fetch low stock', 500, 'INTERNAL_ERROR');
    }
};

/**
 * POST /api/v1/pharmacy/dispense
 * Dispense medicine
 */
export const dispenseMedicine = async (req: Request, res: Response) => {
    try {
        const { patientId, items, prescriptionId, notes } = req.body;

        if (!patientId || !items || items.length === 0) {
            return error(res, 'Patient and items are required', 400, 'VALIDATION_ERROR');
        }

        const result = await pharmacyService.dispenseMedicine({
            patientId,
            items,
            prescriptionId,
            notes,
        });

        return success(res, result, 'Medicine dispensed successfully', 201);
    } catch (err: any) {
        console.error('[PharmacyController.dispenseMedicine]', err);
        return error(res, err.message || 'Failed to dispense medicine', 400, 'VALIDATION_ERROR');
    }
};

/**
 * GET /api/v1/pharmacy/prescriptions
 * Get prescriptions
 */
export const getPrescriptions = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.query;
        const prescriptions = await pharmacyService.getPrescriptions(patientId as string);
        return success(res, prescriptions, 'Prescriptions retrieved successfully');
    } catch (err: any) {
        console.error('[PharmacyController.getPrescriptions]', err);
        return error(res, 'Failed to fetch prescriptions', 500, 'INTERNAL_ERROR');
    }
};
