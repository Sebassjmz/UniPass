import mongoose, { Schema, Document } from 'mongoose';

export interface INonceDocument extends Document {
    address: string;
    nonce: string;
    used: boolean;
    expiresAt: Date;
}

const NonceSchema = new Schema<INonceDocument>(
    {
        address: {
            type: String,
            required: true,
        },
        nonce: {
            type: String,
            required: true,
            unique: true,
        },
        used: {
            type: Boolean,
            default: false,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Auto-eliminar nonces expirados
NonceSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Nonce = mongoose.model<INonceDocument>('Nonce', NonceSchema);