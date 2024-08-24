import mongoose, { models, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        token: { type: String, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
