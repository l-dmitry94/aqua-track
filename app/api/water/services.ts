import { ObjectId } from 'mongodb';

import WaterEntry from '@/models/water';

export const createWaterEntry = async (userId: string, date: Date, volume: number) => {
    const waterEntry = new WaterEntry({
        user: userId,
        date: date,
        volume: volume,
    });
    return await waterEntry.save();
};

export const updateWaterEntry = async (id: string, userId: string, date: Date, volume: number) => {
    const waterEntry = await WaterEntry.findOneAndUpdate(
        { _id: id, user: userId },
        { date, volume },
        { new: true }
    );
    return waterEntry;
};

export const deleteWaterEntry = async (id: string, userId: string) => {
    const waterEntry = await WaterEntry.findOneAndDelete({ _id: id, user: userId });
    return waterEntry;
};

export const getDailyWaterEntries = async (userId: string, selectedDate?: string) => {
    try {
        if (!userId) {
            return [];
        }

        const userObjectId = new ObjectId(userId);

        const startOfDay = selectedDate ? new Date(selectedDate) : new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

        const entries = await WaterEntry.find({
            user: userObjectId,
            date: { $gte: startOfDay, $lt: endOfDay },
        }).exec();

        return entries;
    } catch (error) {
        console.error('Error fetching daily water entries:', error);
        return [];
    }
};



export const getMonthlyWaterEntries = async (userId: string) => {
    try {
        const startDate = new Date();
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);

        const entries = await WaterEntry.find({
            user: userId,
            date: { $gte: startDate, $lt: endDate },
        }).exec();

        return entries;
    } catch (error) {
        console.error('Error fetching monthly water entries:', error);
        return [];
    }
};
