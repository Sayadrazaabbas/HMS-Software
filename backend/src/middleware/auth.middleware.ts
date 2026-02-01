import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, extractToken } from '../utils/jwt';
import { error } from '../utils/response';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                role: string;
            };
        }
    }
}

/**
 * Authenticate request using JWT token
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req.headers.authorization);

    if (!token) {
        return error(res, 'Authentication required', 401, 'UNAUTHORIZED');
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
        return error(res, 'Invalid or expired token', 401, 'INVALID_TOKEN');
    }

    // Attach user to request
    req.user = payload;
    next();
};

/**
 * Authorize request based on roles
 */
export const authorize = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return error(res, 'Authentication required', 401, 'UNAUTHORIZED');
        }

        // Admin has access to everything
        if (req.user.role === 'admin') {
            return next();
        }

        // Check if user's role is in allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return error(res, 'You do not have permission to access this resource', 403, 'FORBIDDEN');
        }

        next();
    };
};
