import { User } from '../models/User.model';
import { AccessService } from './access.service';

export class StudentService {

    static async getProfile(userId: string) {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
    }

    static async updateProfile(userId: string, data: {
        name?: string;
        phone?: string;
        photoUrl?: string;
    }) {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (data.name) user.name = data.name;
        if (data.phone) user.phone = data.phone;
        if (data.photoUrl) user.photoUrl = data.photoUrl;

        await user.save();

        return user;
    }

    static async generateAccessCode(userId: string, location?: string) {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.status !== 'active') {
            throw new Error('Tu cuenta está inactiva o suspendida');
        }

        return AccessService.generateAccessCode(userId, location);
    }

    static async getAccessHistory(userId: string, limit?: number) {
        return AccessService.getAccessHistory(userId, limit);
    }

    static async getStats(userId: string) {
        const history = await AccessService.getAccessHistory(userId, 100);

        const totalAccess = history.filter(log => log.action === 'entry' || log.action === 'exit').length;
        const denied = history.filter(log => log.action === 'denied').length;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayAccess = history.filter(log => {
            const logDate = new Date(log.timestamp);
            return logDate >= today && (log.action === 'entry' || log.action === 'exit');
        }).length;

        return {
            totalAccess,
            denied,
            todayAccess,
            recentHistory: history.slice(0, 5),
        };
    }
}