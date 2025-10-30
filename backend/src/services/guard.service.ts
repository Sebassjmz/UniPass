import { AccessService } from './access.service';
import { User } from '../models/User.model';

export class GuardService {

    static async verifyCode(
        code: string,
        matricula: string,
        guardId: string,
        location?: string
    ) {
        return AccessService.verifyAccessCode(code, matricula, guardId, location);
    }

    static async searchStudent(search: string) {
        const students = await User.find({
            role: 'student',
            status: 'active',
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { matricula: { $regex: search, $options: 'i' } },
            ],
        })
            .select('name matricula photoUrl')
            .limit(10);

        return students;
    }

    static async getRecentVerifications(guardId: string, limit?: number) {
        return AccessService.getRecentAccessLogs(guardId, limit);
    }

    static async manualEntry(
        matricula: string,
        guardId: string,
        action: 'entry' | 'exit',
        location?: string,
        reason?: string
    ) {
        const student = await User.findOne({ matricula, role: 'student' });

        if (!student) {
            throw new Error('Estudiante no encontrado');
        }

        if (student.status !== 'active') {
            throw new Error('Estudiante inactivo o suspendido');
        }

        await AccessService.logAccess({
            userId: String(student._id),
            action,
            checkedBy: guardId,
            location,
            reason: reason || 'Entrada manual',
        });

        return {
            success: true,
            message: `${action === 'entry' ? 'Entrada' : 'Salida'} registrada manualmente`,
            student: {
                name: student.name,
                matricula: student.matricula,
                photoUrl: student.photoUrl,
            },
        };
    }

    static async reportIncident(
        guardId: string,
        matricula: string,
        reason: string,
        location?: string
    ) {
        const student = await User.findOne({ matricula });

        await AccessService.logAccess({
            userId: student ? String(student._id) : null,
            action: 'denied',
            checkedBy: guardId,
            location,
            reason: `INCIDENTE: ${reason}`,
        });

        return {
            success: true,
            message: 'Incidente reportado',
        };
    }
}