import { Response } from 'express';
import { AccessService } from '../services/access.service';
import { AuthRequest } from '../types';

export class AccessController {

    static async generateCode(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { location } = req.body;

            const { code, expiresAt } = await AccessService.generateAccessCode(
                req.user.id,
                location
            );

            res.status(201).json({
                success: true,
                message: 'Código generado exitosamente',
                data: {
                    code,
                    expiresAt,
                    expiresIn: `${Math.floor((expiresAt.getTime() - Date.now()) / 1000)} segundos`,
                },
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async verifyCode(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const { code, matricula, location } = req.body;

            const result = await AccessService.verifyAccessCode(
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

    static async getHistory(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const limit = parseInt(req.query.limit as string) || 10;
            const history = await AccessService.getAccessHistory(req.user.id, limit);

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
}