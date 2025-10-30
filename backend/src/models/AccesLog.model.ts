import mongoose, { Schema, Document } from 'mongoose';

export interface IAccessLogDocument extends Document {
    userId: mongoose.Types.ObjectId;
    action: 'entry' | 'exit' | 'denied';
    timestamp: Date;
    location?: string;
    checkedBy?: mongoose.Types.ObjectId;
    codeId?: mongoose.Types.ObjectId;
    reason?: string;
}

const AccessLogSchema = new Schema<IAccessLogDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        action: {
            type: String,
            enum: ['entry', 'exit', 'denied'],
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true,
        },
        location: {
            type: String,
        },
        checkedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        codeId: {
            type: Schema.Types.ObjectId,
            ref: 'AccessCode',
        },
        reason: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index para queries comunes
AccessLogSchema.index({ userId: 1, timestamp: -1 });
AccessLogSchema.index({ checkedBy: 1, timestamp: -1 });

export const AccessLog = mongoose.model<IAccessLogDocument>('AccessLog', AccessLogSchema);