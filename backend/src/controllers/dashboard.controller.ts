import { Request, Response } from 'express';
import * as dashboardService from '../services/dashboard.service';
import { success, error } from '../utils/response';

/**
 * GET /api/v1/dashboard/stats
 * Get dashboard statistics
 */
export const getStats = async (req: Request, res: Response) => {
    try {
        const stats = await dashboardService.getStats();
        return success(res, stats, 'Dashboard stats retrieved successfully');
    } catch (err: any) {
        console.error('[DashboardController.getStats]', err.message);
        return error(res, 'Failed to fetch dashboard stats', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/dashboard/recent-patients
 * Get recent patients
 */
export const getRecentPatients = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 5;
        const patients = await dashboardService.getRecentPatients(limit);
        return success(res, patients, 'Recent patients retrieved successfully');
    } catch (err: any) {
        console.error('[DashboardController.getRecentPatients]', err.message);
        return error(res, 'Failed to fetch recent patients', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/dashboard/today-appointments
 * Get today's appointments
 */
export const getTodayAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await dashboardService.getTodayAppointments();
        return success(res, appointments, 'Today appointments retrieved successfully');
    } catch (err: any) {
        console.error('[DashboardController.getTodayAppointments]', err.message);
        return error(res, 'Failed to fetch today appointments', 500, 'INTERNAL_ERROR');
    }
};
