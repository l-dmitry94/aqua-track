import { FilterQuery, UpdateQuery } from 'mongoose';

import User from '@/models/user';

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    token?: string;
}

export const findUser = async (filter: FilterQuery<IUser>): Promise<IUser | null> => {
    const user = await User.findOne(filter);
    return user;
};

export const registerUser = async (data: Omit<IUser, '_id'>): Promise<IUser> => {
    const user = await User.create(data);
    return user;
};

export const updateUser = async (
    filter: FilterQuery<IUser>,
    data: UpdateQuery<IUser>
): Promise<IUser | null> => {
    const user = await User.findByIdAndUpdate(filter, data);
    return user;
};
