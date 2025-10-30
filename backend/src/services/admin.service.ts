import { User } from '../models/User.model';
import { AccessLog } from '../models/AccessLog.model';
import { AccessCode } from '../models/AccessCode.model';

export class AdminService {

    static async getAllUsers(filters?: {
        role?: string;
        status?: string;
        search?: string;
    }) {
        const query: any = {};

        if (filters?.role) {
            query.role = filters.role;
        }

        if (filters?.status) {
            query.status = filters.status;
        }

        if (filters?.search) {
            query.$or = [
                { name: { $regex: filters.search, $options: 'i' } },
                { email: { $regex: filters.search, $options: 'i' } },
                { matricula: { $regex: filters.search, $options: 'i' } },
            ];
        }

        return User.find(query).select('-password').sort({ createdAt: -1 });
    }

    static async getUserById(userId: string) {
        return User.findById(userId).select('-password');
    }

    static async updateUser(userId: string, data: {
        name?: string;
        email?: string;
        phone?: string;
        status?: string;
        role?: string;
    }) {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        Object.assign(user, data);
        await user.save();

        return user;
    }

    static async deleteUser(userId: string) {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await user.deleteOne();
        return { message: 'Usuario eliminado correctamente' };
    }

    static async getAccessStats(filters?: {
        startDate?: Date;
        endDate?: Date;
    }) {
        const query: any = {};

        if (filters?.startDate || filters?.endDate) {
            query.timestamp = {};
            if (filters.startDate) query.timestamp.$gte = filters.startDate;
            if (filters.endDate) query.timestamp.$lte = filters.endDate;
        }

        const totalAccess = await AccessLog.countDocuments(query);
        const successfulAccess = await AccessLog.countDocuments({ ...query, action: { $in: ['entry', 'exit'] } });
        const deniedAccess = await AccessLog.countDocuments({ ...query, action: 'denied' });

        const accessByDay = await AccessLog.aggregate([
            { $match: query },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        return {
            totalAccess,
            successfulAccess,
            deniedAccess,
            accessByDay,
        };
    }

    static async getAllAccessLogs(filters?: {
        userId?: string;
        action?: string;
        startDate?: Date;
        endDate?: Date;
        limit?: number;
    }) {
        const query: any = {};

        if (filters?.userId) query.userId = filters.userId;
        if (filters?.action) query.action = filters.action;

        if (filters?.startDate || filters?.endDate) {
            query.timestamp = {};
            if (filters.startDate) query.timestamp.$gte = filters.startDate;
            if (filters.endDate) query.timestamp.$lte = filters.endDate;
        }

        return AccessLog.find(query)
            .populate('userId', 'name matricula')
            .populate('checkedBy', 'name')
            .sort({ timestamp: -1 })
            .limit(filters?.limit || 50);
    }

    static async getActiveCodes() {
        return AccessCode.find({
            used: false,
            expiresAt: { $gt: new Date() },
        })
            .populate('userId', 'name matricula')
            .sort({ createdAt: -1 });
    }
}