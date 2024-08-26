import mongoose, { models, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        token: { type: String, default: null },
        gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
        weight: { type: Number, default: 0 },
        activeTime: { type: Number, default: 0 },
        waterIntake: { type: Number, default: 1.8 },
        avatar: { type: String, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
