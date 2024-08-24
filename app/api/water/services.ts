import WaterEntry from '@/models/water';

export const createWaterEntry = async (userId: string, date: Date, volume: number) => {
    const waterEntry = await WaterEntry.create({ user: userId, date, volume });
    return waterEntry;
};

export const updateWaterEntry = async (id: string, date: Date, volume: number) => {
    const waterEntry = await WaterEntry.findByIdAndUpdate(
        id,
        { date, volume },
        { new: true }
    );
    return waterEntry;
};

export const deleteWaterEntry = async (id: string) => {
    const waterEntry = await WaterEntry.findByIdAndDelete(id);
    return waterEntry;
};

export const getDailyWaterEntries = async (userId: string) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const entries = await WaterEntry.find({
        user: userId,
        date: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) }
    });
    return entries;
};

export const getMonthlyWaterEntries = async (userId: string) => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    const entries = await WaterEntry.find({
        user: userId,
        date: { $gte: date, $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1) }
    });
    return entries;
};

export const getWaterEntryById = async (id: string) => {
    const waterEntry = await WaterEntry.findById(id);
    return waterEntry;
};
