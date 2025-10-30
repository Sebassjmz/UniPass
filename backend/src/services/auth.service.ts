const jwt = require('jsonwebtoken');
import { User, IUserDocument } from '../models/User.model';
import { env } from '../config/env';
import { JWTPayload } from '../types';

export class AuthService {

    static async register(data: {
        name: string;
        email: string;
        password: string;
        matricula: string;
        phone?: string;
        role?: string;
    }): Promise<{ user: IUserDocument; token: string }> {

        const existingUser = await User.findOne({
            $or: [{ email: data.email }, { matricula: data.matricula }],
        });

        if (existingUser) {
            throw new Error('El email o matrícula ya están registrados');
        }

        const user = await User.create(data);

        const token = this.generateToken(user);

        return { user, token };
    }

    static async login(email: string, password: string): Promise<{ user: IUserDocument; token: string }> {

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        if (user.status !== 'active') {
            throw new Error('Usuario inactivo o suspendido');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        const token = this.generateToken(user);

        return { user, token };
    }

    static generateToken(user: IUserDocument): string {
        const payload: JWTPayload = {
            id: String(user._id),
            email: user.email,
            role: user.role,
            matricula: user.matricula,
        };

        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN,
        });
    }

    static verifyToken(token: string): JWTPayload {
        try {
            return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
        } catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }

    static async getUserById(userId: string): Promise<IUserDocument | null> {
        return User.findById(userId).select('-password');
    }
}