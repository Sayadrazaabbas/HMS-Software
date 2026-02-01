import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { success, error } from '../utils/response';

/**
 * POST /api/v1/auth/login
 * Login user with email and password
 */
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return error(res, 'Email and password are required', 400, 'VALIDATION_ERROR');
        }

        // Attempt login
        const result = await authService.login({ email, password });

        return success(res, result, 'Login successful');
    } catch (err: any) {
        console.error('[AuthController.login]', err.message);

        if (err.message.includes('Invalid') || err.message.includes('deactivated')) {
            return error(res, err.message, 401, 'AUTHENTICATION_FAILED');
        }

        return error(res, 'Login failed', 500, 'INTERNAL_ERROR');
    }
};

/**
 * GET /api/v1/auth/me
 * Get current authenticated user
 */
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return error(res, 'Not authenticated', 401, 'UNAUTHORIZED');
        }

        const user = await authService.getUserById(req.user.userId);
        return success(res, user, 'User retrieved successfully');
    } catch (err: any) {
        console.error('[AuthController.getCurrentUser]', err.message);
        return error(res, err.message, 500, 'INTERNAL_ERROR');
    }
};

/**
 * POST /api/v1/auth/logout
 * Logout user (client-side token removal)
 */
export const logout = async (req: Request, res: Response) => {
    // JWT is stateless, so logout is handled client-side
    // Here we just return success
    return success(res, null, 'Logged out successfully');
};
