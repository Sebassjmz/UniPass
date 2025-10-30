import { Request } from 'express';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    matricula: string;
    phone?: string;
    photoUrl?: string;
    role: 'student' | 'guard' | 'admin';
    status: 'active' | 'inactive' | 'suspended';
    createdAt: Date;
    updatedAt: Date;
}

export interface IAccessCode {
    _id: string;
    userId: string;
    codeHash: string;
    expiresAt: Date;
    used: boolean;
    usedAt?: Date;
    location?: string;
    createdAt: Date;
}

export interface IAccessLog {
    _id: string;
    userId: string;
    action: 'entry' | 'exit' | 'denied';
    timestamp: Date;
    location?: string;
    checkedBy?: string;
    codeId?: string;
    reason?: string;
    createdAt: Date;
}

export interface INonce {
    address: string;
    nonce: string;
    used: boolean;
    expiresAt: Date;
    createdAt: Date;
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
        matricula?: string;
    };
}

export interface JWTPayload {
    id: string;
    email: string;
    role: string;
    matricula?: string;
}