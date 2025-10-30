import { Response } from 'express';
import { GuardService } from '../services/guard.service';
import { AuthRequest } from '../types';

export class GuardController {

    static async verifyCode(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { code, matricula, location } = req.body;

            const result = await GuardService.verifyCode(
                code,
                matricula,
                req.user.id,
                location
            );

            if (!result.valid) {
                return res.status(400).json({
                    success: false,
                    message: result.message,
                });
            }

            res.status(200).json({
                success: true,
                message: result.message,
                data: result.user,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async searchStudent(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { search } = req.query;

            if (!search || typeof search !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Parámetro de búsqueda requerido',
                });
            }

            const students = await GuardService.searchStudent(search);

            res.status(200).json({
                success: true,
                data: students,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getRecentVerifications(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const limit = parseInt(req.query.limit as string) || 20;
            const verifications = await GuardService.getRecentVerifications(req.user.id, limit);

            res.status(200).json({
                success: true,
                data: verifications,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async manualEntry(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { matricula, action, location, reason } = req.body;

            const result = await GuardService.manualEntry(
                matricula,
                req.user.id,
                action,
                location,
                reason
            );

            res.status(200).json({
                success: true,
                message: result.message,
                data: result.student,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async reportIncident(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { matricula, reason, location } = req.body;

            const result = await GuardService.reportIncident(
                req.user.id,
                matricula,
                reason,
                location
            );

            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}