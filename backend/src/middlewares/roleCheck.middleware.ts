import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

export const requireRole = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'No autenticado',
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para acceder a este recurso',
            });
        }

        next();
    };
};

export const isStudent = requireRole('student');
export const isGuard = requireRole('guard');
export const isAdmin = requireRole('admin');
export const isGuardOrAdmin = requireRole('guard', 'admin');