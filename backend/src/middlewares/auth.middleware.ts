import { Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types';

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token no proporcionado',
            });
        }

        const decoded = AuthService.verifyToken(token);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            matricula: decoded.matricula,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado',
        });
    }
};