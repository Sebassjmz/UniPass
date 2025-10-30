import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessCodeDocument extends Document {
    userId: mongoose.Types.ObjectId;
    codeHash: string;
    expiresAt: Date;
    used: boolean;
    usedAt?: Date;
    location?: string;
}

const AccessCodeSchema = new Schema<IAccessCodeDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        codeHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        used: {
            type: Boolean,
            default: false,
        },
        usedAt: {
            type: Date,
        },
        location: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index para buscar códigos rápido
AccessCodeSchema.index({ userId: 1, used: 1, expiresAt: 1 });
AccessCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 600 }); // Auto-eliminar después de 10 min

export const AccessCode = mongoose.model<IAccessCodeDocument>('AccessCode', AccessCodeSchema);