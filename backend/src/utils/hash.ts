import bcrypt from 'bcryptjs';
import { env } from '../config/env';

export class HashUtil {

    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
        return bcrypt.hash(password, salt);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static async hashCode(code: string): Promise<string> {
        const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
        return bcrypt.hash(code, salt);
    }

    static async compareCode(code: string, hash: string): Promise<boolean> {
        return bcrypt.compare(code, hash);
    }
}