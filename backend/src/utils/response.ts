import { Response } from 'express';

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

/**
 * Send success response
 */
export const success = (
    res: Response,
    data: any,
    message = 'Success',
    statusCode = 200,
    pagination?: Pagination
) => {
    const response: any = {
        success: true,
        message,
        data,
    };

    if (pagination) {
        response.pagination = pagination;
    }

    return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const error = (
    res: Response,
    message: string,
    statusCode = 400,
    code = 'ERROR',
    details?: any
) => {
    const response: any = {
        success: false,
        error: {
            code,
            message,
        },
    };

    if (details) {
        response.error.details = details;
    }

    return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 */
export const validationError = (res: Response, errors: any[]) => {
    return res.status(400).json({
        success: false,
        error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: errors,
        },
    });
};
