import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken, TokenPayload } from '../utils/jwt';

const prisma = new PrismaClient();

interface LoginInput {
    email: string;
    password: string;
}

interface LoginResult {
    user: {
        id: string;
        email: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        role: {
            id: string;
            name: string;
            displayName: string;
            permissions: string[];
        };
    };
    accessToken: string;
    refreshToken: string;
}

/**
 * Authenticate user with email and password
 */
export const login = async ({ email, password }: LoginInput): Promise<LoginResult> => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            role: true,
        },
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
        throw new Error('Your account has been deactivated. Please contact administrator.');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Update last login
    await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role.name,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            avatar: user.avatar,
            role: {
                id: user.role.id,
                name: user.role.name,
                displayName: user.role.displayName,
                permissions: user.role.permissions,
            },
        },
        accessToken,
        refreshToken,
    };
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            role: true,
            doctor: {
                include: {
                    department: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
