import { create } from 'zustand';

import { WaterBody, WaterResponse } from '@/api/water/water.api.types';

import * as water from '../../api/water/water.api';

type waterStore = {
    isLoading: boolean;
    currentMonth: string;
    dailyWater: WaterResponse[];
    weeklyWater: WaterResponse[];
    monthlyWater: WaterResponse[];
    setCurrentDate: (date: string) => void;
    createWater: (body: WaterBody) => Promise<WaterResponse | undefined>;
    updateWater: (body: WaterBody, waterId: string) => Promise<WaterResponse | undefined>;
    deleteWater: (id: string) => Promise<WaterBody | undefined>;
    fetchDailyWater: (date: string) => Promise<void>;
    fetchWeeklyWater: (date: string) => Promise<WaterResponse[] | undefined>;
    fetchMonthlyWater: (date: string) => Promise<WaterResponse[] | undefined>;
};

export const useWaterStore = create<waterStore>()((set) => ({
    isLoading: true,
    currentMonth: '',
    currentDate: '',
    dailyWater: [],
    weeklyWater: [],
    monthlyWater: [],
    setCurrentDate: (date: string) => set((state) => ({ ...state, currentDate: date })),
    createWater: async (body: WaterBody) => {
        try {
            const data = await water.fetchCreateWater(body);
            set((state) => ({ dailyWater: [...state.dailyWater, data] }));
            return data;
        } catch (err: any) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },
    updateWater: async (body: WaterBody, waterId: string) => {
        try {
            const data = await water.fetchUpdateWater(body, waterId);
            set((state) => ({
                dailyWater: state.dailyWater.map((water) =>
                    water.id === waterId ? { ...water, ...body } : water
                ),
            }));
            return data;
        } catch (err: any) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },
    deleteWater: async (id: string) => {
        try {
            const data = await water.fetchDeleteWater(id);
            set((state) => ({
                dailyWater: state.dailyWater.filter((water) => water.id !== id),
            }));
            return data;
        } catch (err: any) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },
    fetchDailyWater: async (date: string) => {
        try {
            const data = await water.fetchDailyWater(date);
            set((state) => ({
                dailyWater: data,
            }));
        } catch (err: any) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },
    fetchWeeklyWater: async (date: string) => {
        try {
            const data = await water.fetchWeeklyWater(date);
            set((state) => ({ weeklyWater: data }));
            return data;
        } catch (err: any) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },
    fetchMonthlyWater: async (date: string) => {
        const data = await water.fetchMonthlyWater(date);
        set((state) => ({ monthlyWater: data }));
        return data;
    },
}));
