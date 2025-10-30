import { Response } from 'express';
import { StudentService } from '../services/student.service';
import { AuthRequest } from '../types';

export class StudentController {

    static async getProfile(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const profile = await StudentService.getProfile(req.user.id);

            res.status(200).json({
                success: true,
                data: profile,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async updateProfile(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { name, phone, photoUrl } = req.body;

            const updatedProfile = await StudentService.updateProfile(req.user.id, {
                name,
                phone,
                photoUrl,
            });

            res.status(200).json({
                success: true,
                message: 'Perfil actualizado',
                data: updatedProfile,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async generateAccessCode(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { location } = req.body;

            const { code, expiresAt } = await StudentService.generateAccessCode(
                req.user.id,
                location
            );

            res.status(201).json({
                success: true,
                message: 'Código generado',
                data: {
                    code,
                    expiresAt,
                },
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getAccessHistory(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const limit = parseInt(req.query.limit as string) || 10;
            const history = await StudentService.getAccessHistory(req.user.id, limit);

            res.status(200).json({
                success: true,
                data: history,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getStats(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const stats = await StudentService.getStats(req.user.id);

            res.status(200).json({
                success: true,
                data: stats,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}