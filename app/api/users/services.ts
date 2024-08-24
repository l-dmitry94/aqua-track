import User from '@/models/user';

export const findUserByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
};

export const registerUser = async (name: string, email: string, password: string) => {
    const user = await User.create({ name, email, password });
    return user;
};

export const updateUserToken = async (userId: string, token: string) => {
    const user = await User.findByIdAndUpdate(userId, { token });
    return user;
};
