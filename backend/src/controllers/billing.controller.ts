import { Request, Response } from 'express';
import * as billingService from '../services/billing.service';
import { success, error } from '../utils/response';

/**
 * GET /api/v1/billing/invoices
 * Get all invoices with filters
 */
export const getAll = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, status, patientId } = req.query;

        const result = await billingService.getAll({
            page: Number(page),
            limit: Number(limit),
            status: status as any,
            patientId: patientId as string,
        });

        return success(res, result.data, 'Invoices retrieved successfully', 200, result.pagination);
    } catch (err: any) {
        console.error('[BillingController.getAll]', err);
        return error(res, 'Failed to fetch invoices', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/billing/invoices/:id
 * Get invoice by ID
 */
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const invoice = await billingService.getById(id);

        if (!invoice) {
            return error(res, 'Invoice not found', 404, 'NOT_FOUND');
        }

        return success(res, invoice, 'Invoice retrieved successfully');
    } catch (err: any) {
        console.error('[BillingController.getById]', err);
        return error(res, 'Failed to fetch invoice', 500, 'INTERNAL_ERROR');
    }
};

/**
 * POST /api/v1/billing/invoices
 * Create new invoice
 */
export const create = async (req: Request, res: Response) => {
    try {
        const { patientId, items, discount, tax, visitId } = req.body;

        if (!patientId || !items || items.length === 0) {
            return error(res, 'Patient and at least one item are required', 400, 'VALIDATION_ERROR');
        }

        const invoice = await billingService.create({
            patientId,
            items,
            discount,
            tax,
            visitId,
        });

        return success(res, invoice, 'Invoice created successfully', 201);
    } catch (err: any) {
        console.error('[BillingController.create]', err);
        return error(res, err.message || 'Failed to create invoice', 400, 'VALIDATION_ERROR');
    }
};

/**
 * POST /api/v1/billing/invoices/:id/payments
 * Add payment to invoice
 */
export const addPayment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { amount, method, reference, notes } = req.body;

        if (!amount || !method) {
            return error(res, 'Amount and payment method are required', 400, 'VALIDATION_ERROR');
        }

        const payment = await billingService.addPayment({
            invoiceId: id,
            amount: Number(amount),
            method,
            reference,
            notes,
        });

        return success(res, payment, 'Payment recorded successfully', 201);
    } catch (err: any) {
        console.error('[BillingController.addPayment]', err);

        if (err.message === 'Invoice not found') {
            return error(res, 'Invoice not found', 404, 'NOT_FOUND');
        }

        return error(res, err.message || 'Failed to record payment', 400, 'VALIDATION_ERROR');
    }
};

/**
 * GET /api/v1/billing/services
 * Get all services for billing
 */
export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await billingService.getServices();
        return success(res, services, 'Services retrieved successfully');
    } catch (err: any) {
        console.error('[BillingController.getServices]', err);
        return error(res, 'Failed to fetch services', 500, 'INTERNAL_ERROR');
    }
};

/**
 * DELETE /api/v1/billing/invoices/:id
 * Cancel invoice
 */
export const cancelInvoice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await billingService.cancelInvoice(id);
        return success(res, null, 'Invoice cancelled successfully');
    } catch (err: any) {
        console.error('[BillingController.cancelInvoice]', err);

        if (err.code === 'P2025') {
            return error(res, 'Invoice not found', 404, 'NOT_FOUND');
        }

        return error(res, 'Failed to cancel invoice', 500, 'INTERNAL_ERROR');
    }
};
