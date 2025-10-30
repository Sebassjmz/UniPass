import bcrypt from 'bcryptjs';
import { AccessCode } from '../models/AccesCode.model';
import { AccessLog } from '../models/AccesLog.model';
import { User } from '../models/User.model';
import { env } from '../config/env';

export class AccessService {

    static generateOTP(): string {
        const length = env.OTP_LENGTH;
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    }

    static async hashCode(code: string): Promise<string> {
        const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
        return bcrypt.hash(code, salt);
    }

    static async generateAccessCode(userId: string, location?: string): Promise<{ code: string; expiresAt: Date }> {

        // Invalidar códigos anteriores no usados del usuario
        await AccessCode.updateMany(
            { userId, used: false },
            { used: true, usedAt: new Date() }
        );

        const code = this.generateOTP();
        const codeHash = await this.hashCode(code);
        const expiresAt = new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000);

        await AccessCode.create({
            userId,
            codeHash,
            expiresAt,
            location,
        });

        return { code, expiresAt };
    }

    static async verifyAccessCode(
        code: string,
        matricula: string,
        guardId: string,
        location?: string
    ): Promise<{ valid: boolean; user?: any; message: string }> {

        const user = await User.findOne({ matricula, status: 'active' });

        if (!user) {
            await this.logAccess({
                userId: null,
                action: 'denied',
                reason: 'Usuario no encontrado o inactivo',
                checkedBy: guardId,
                location,
            });

            return { valid: false, message: 'Usuario no encontrado o inactivo' };
        }

        const accessCodes = await AccessCode.find({
            userId: user._id,
            used: false,
            expiresAt: { $gt: new Date() },
        });

        if (accessCodes.length === 0) {
            await this.logAccess({
                userId: String(user._id),
                action: 'denied',
                reason: 'No hay códigos válidos',
                checkedBy: guardId,
                location,
            });

            return { valid: false, message: 'Código expirado o no existe' };
        }

        // Verificar el código contra todos los hashes activos
        let validCode = null;
        for (const accessCode of accessCodes) {
            const isValid = await bcrypt.compare(code, accessCode.codeHash);
            if (isValid) {
                validCode = accessCode;
                break;
            }
        }

        if (!validCode) {
            await this.logAccess({
                userId: String(user._id),
                action: 'denied',
                reason: 'Código incorrecto',
                checkedBy: guardId,
                location,
            });

            return { valid: false, message: 'Código incorrecto' };
        }

        // Marcar código como usado
        validCode.used = true;
        validCode.usedAt = new Date();
        await validCode.save();

        // Log de acceso exitoso
        await this.logAccess({
            userId: String(user._id),
            action: 'entry',
            checkedBy: guardId,
            codeId: String(validCode._id),
            location,
        });

        return {
            valid: true,
            user: {
                name: user.name,
                matricula: user.matricula,
                photoUrl: user.photoUrl,
            },
            message: 'Acceso concedido',
        };
    }

    static async logAccess(data: {
        userId: string | null;
        action: 'entry' | 'exit' | 'denied';
        checkedBy?: string;
        codeId?: string;
        location?: string;
        reason?: string;
    }): Promise<void> {
        await AccessLog.create({
            ...data,
            timestamp: new Date(),
        });
    }

    static async getAccessHistory(userId: string, limit: number = 10) {
        return AccessLog.find({ userId })
            .sort({ timestamp: -1 })
            .limit(limit)
            .populate('checkedBy', 'name')
            .lean();
    }

    static async getRecentAccessLogs(guardId: string, limit: number = 20) {
        return AccessLog.find({ checkedBy: guardId })
            .sort({ timestamp: -1 })
            .limit(limit)
            .populate('userId', 'name matricula photoUrl')
            .lean();
    }
}