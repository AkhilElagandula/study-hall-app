// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: {
        type: String,
        required: true,
        unique: true, // ensure mobile is unique
    },
    gender: String
});

UserSchema.index({ mobile: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);