import mongoose, { Schema, Document } from 'mongoose';
const bcrypt = require('bcrypt');
import { env } from '../config/env';

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    matricula: string;
    phone?: string;
    photoUrl?: string;
    role: 'student' | 'guard' | 'admin';
    status: 'active' | 'inactive' | 'suspended';
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        matricula: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        photoUrl: {
            type: String,
        },
        role: {
            type: String,
            enum: ['student', 'guard', 'admin'],
            default: 'student',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

// Hashear password antes de guardar
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Comparar passwords
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUserDocument>('User', UserSchema);