import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const verifyCodeLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX_REQUESTS,
    message: {
        success: false,
        message: 'Demasiados intentos, intenta de nuevo en un minuto',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10,
    message: {
        success: false,
        message: 'Demasiados intentos de login, intenta de nuevo más tarde',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 60,
    message: {
        success: false,
        message: 'Demasiadas peticiones, intenta de nuevo en un momento',
    },
    standardHeaders: true,
    legacyHeaders: false,
});