import mongoose, { Schema, Document, models } from "mongoose";

export interface OtpDocument extends Document {
  id: mongoose.Schema.Types.ObjectId,
  mobile: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
  lastGeneratedAt: Date;
  lastVerifiedAt?: Date;
  attempts: number;
  verified: boolean;
  channel: 'sms' | 'email';
  verifiedByIp?: string;
}

const OtpSchema: Schema<OtpDocument> = new Schema<OtpDocument>({
  id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  mobile: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  lastGeneratedAt: {
    type: Date,
    required: true,
  },
  lastVerifiedAt: {
    type: Date,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  channel: {
    type: String,
    enum: ['sms', 'email'],
    default: 'sms',
  },
  verifiedByIp: {
    type: String,
  },
});


export default models.Otp || mongoose.model<OtpDocument>("Otp", OtpSchema);