import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: number;
    NODE_ENV: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    OTP_EXPIRY_MINUTES: number;
    OTP_LENGTH: number;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX_REQUESTS: number;
    FRONTEND_URL: string;
    BCRYPT_SALT_ROUNDS: number;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Falta la variable de entorno: ${key}`);
    }
    return value;
};

export const env: EnvConfig = {
    PORT: parseInt(getEnvVariable('PORT', '5000'), 10),
    NODE_ENV: getEnvVariable('NODE_ENV', 'development'),
    MONGODB_URI: getEnvVariable('MONGODB_URI'),
    JWT_SECRET: getEnvVariable('JWT_SECRET'),
    JWT_EXPIRES_IN: getEnvVariable('JWT_EXPIRES_IN', '7d'),
    OTP_EXPIRY_MINUTES: parseInt(getEnvVariable('OTP_EXPIRY_MINUTES', '5'), 10),
    OTP_LENGTH: parseInt(getEnvVariable('OTP_LENGTH', '6'), 10),
    RATE_LIMIT_WINDOW_MS: parseInt(getEnvVariable('RATE_LIMIT_WINDOW_MS', '60000'), 10),
    RATE_LIMIT_MAX_REQUESTS: parseInt(getEnvVariable('RATE_LIMIT_MAX_REQUESTS', '5'), 10),
    FRONTEND_URL: getEnvVariable('FRONTEND_URL', 'http://localhost:3000'),
    BCRYPT_SALT_ROUNDS: parseInt(getEnvVariable('BCRYPT_SALT_ROUNDS', '10'), 10),
};