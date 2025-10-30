import { Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AuthRequest } from '../types';

export class AdminController {

    static async getAllUsers(req: AuthRequest, res: Response) {
        try {
            const { role, status, search } = req.query;

            const users = await AdminService.getAllUsers({
                role: role as string,
                status: status as string,
                search: search as string,
            });

            res.status(200).json({
                success: true,
                data: users,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getUserById(req: AuthRequest, res: Response) {
        try {
            const { userId } = req.params;

            const user = await AdminService.getUserById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async updateUser(req: AuthRequest, res: Response) {
        try {
            const { userId } = req.params;
            const { name, email, phone, status, role } = req.body;

            const updatedUser = await AdminService.updateUser(userId, {
                name,
                email,
                phone,
                status,
                role,
            });

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado',
                data: updatedUser,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async deleteUser(req: AuthRequest, res: Response) {
        try {
            const { userId } = req.params;

            const result = await AdminService.deleteUser(userId);

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

    static async getAccessStats(req: AuthRequest, res: Response) {
        try {
            const { startDate, endDate } = req.query;

            const filters: any = {};
            if (startDate) filters.startDate = new Date(startDate as string);
            if (endDate) filters.endDate = new Date(endDate as string);

            const stats = await AdminService.getAccessStats(filters);

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

    static async getAllAccessLogs(req: AuthRequest, res: Response) {
        try {
            const { userId, action, startDate, endDate, limit } = req.query;

            const filters: any = {};
            if (userId) filters.userId = userId as string;
            if (action) filters.action = action as string;
            if (startDate) filters.startDate = new Date(startDate as string);
            if (endDate) filters.endDate = new Date(endDate as string);
            if (limit) filters.limit = parseInt(limit as string);

            const logs = await AdminService.getAllAccessLogs(filters);

            res.status(200).json({
                success: true,
                data: logs,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getActiveCodes(req: AuthRequest, res: Response) {
        try {
            const codes = await AdminService.getActiveCodes();

            res.status(200).json({
                success: true,
                data: codes,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}