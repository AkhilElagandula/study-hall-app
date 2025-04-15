import { User } from '@/types/auth.types';
import mongoose, { Schema, models } from 'mongoose';

export interface IEarlyUser extends User {
  name: string;
  mobile: string;
  gender: string;
}

const earlyUserSchema = new Schema<IEarlyUser>({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

export default models.EarlyUser || mongoose.model<IEarlyUser>('EarlyUser', earlyUserSchema);
