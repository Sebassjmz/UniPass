import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../types';

export class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const { name, email, password, matricula, phone, role } = req.body;

            const { user, token } = await AuthService.register({
                name,
                email,
                password,
                matricula,
                phone,
                role,
            });

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        matricula: user.matricula,
                        role: user.role,
                        status: user.status,
                    },
                    token,
                },
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const { user, token } = await AuthService.login(email, password);

            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        matricula: user.matricula,
                        role: user.role,
                        status: user.status,
                        photoUrl: user.photoUrl,
                    },
                    token,
                },
            });
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getMe(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'No autenticado',
                });
            }

            const user = await AuthService.getUserById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }

            res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    matricula: user.matricula,
                    role: user.role,
                    status: user.status,
                    photoUrl: user.photoUrl,
                },
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}