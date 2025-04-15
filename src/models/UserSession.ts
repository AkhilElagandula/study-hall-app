// models/UserSession.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUserSession extends Document {
    mobile: string;
    userId: mongoose.Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    userAgent?: string;
    ipAddress?: string;
}

const UserSessionSchema = new Schema<IUserSession>({
    mobile: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String },
    ipAddress: { type: String },
}, { timestamps: true });

UserSessionSchema.index({ mobile: 1 });

export default mongoose.models.UserSession ||
    mongoose.model<IUserSession>("UserSession", UserSessionSchema);
