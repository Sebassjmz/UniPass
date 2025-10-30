import { env } from '../config/env';

export class Logger {

    static info(message: string, meta?: any) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta || '');
    }

    static error(message: string, error?: any) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
    }

    static warn(message: string, meta?: any) {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta || '');
    }

    static debug(message: string, meta?: any) {
        if (env.NODE_ENV === 'development') {
            console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta || '');
        }
    }

    static access(userId: string, action: string, details?: any) {
        console.log(`[ACCESS] ${new Date().toISOString()} - User: ${userId} - Action: ${action}`, details || '');
    }
}