import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { WaterBody } from '@/api/water/water.api.types';

import * as water from '../../api/water/water.api';

type waterStore = {
    isLoading: boolean;
    currentMonth: string;
    error: string | null;
    dailyWater: WaterResponse[];
    weeklyWater: WaterResponse[];
    monthlyWater: WaterResponse[];
    setCurrentDate: (date: string) => void;
    createWater: (body: WaterBody) => void;
    updateWater: (body: WaterBody, waterId: string) => void;
    deleteWater: (id: string) => void;
    fetchDailyWater: (date: string) => void;
    fetchWeeklyWater: (date: string) => void;
    fetchMonthlyWater: (date: string) => void;
};

export const useWaterStore = create<waterStore>()((set) => ({
    isLoading: true,
    error: null,
    currentMonth: '',
    currentDate: '',
    dailyWater: [],
    weeklyWater: [],
    monthlyWater: [],
    setCurrentDate: (date: string) => set((state) => ({ ...state, currentDate: date })),
    createWater: async (body: WaterBody) => {
        try {
            set({ isLoading: true, error: null });
import { waterStore } from './store.types';

export const useWaterStore = create<waterStore>()(
    devtools(
        (set) => ({
            isLoading: true,
            error: null,
            currentMonthState: dayjs().format('YYYY-MM'),
            currentDate: dayjs().format('YYYY-MM-DD'),
            dailyWater: [],
            weeklyWater: [],
            monthlyWater: [],
            setCurrentDate: (date: string) => set((state) => ({ ...state, currentDate: date })),
            setCurrentMonth: (date: string) =>
                set((state) => ({ ...state, currentMonthState: date })),
            createWater: async (body: WaterBody) => {
                try {
                    set({ isLoading: true });

            const data = await water.fetchCreateWater(body);
            set((state) => ({ dailyWater: [...state.dailyWater, data] }));
        } catch (err: any) {
            set({ error: err.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    updateWater: async (body: WaterBody, waterId: string) => {
        try {
            set({ isLoading: true, error: null });
                    const data = await water.fetchCreateWater(body);
                    set((state) => ({ dailyWater: [...state.dailyWater, data] }));
                } catch (err: any) {
                    console.error(err);
                } finally {
                    set({ isLoading: false });
                }
            },
            updateWater: async (body: WaterBody, waterId: string) => {
                try {
                    set({ isLoading: true });

            const data = await water.fetchUpdateWater(body, waterId);
            set((state) => ({
                dailyWater: state.dailyWater.map((water) =>
                    water.id === waterId ? { ...water, ...data } : water
                ),
            }));
        } catch (err: any) {
            set({ error: err.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteWater: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
                    const data = await water.fetchUpdateWater(body, waterId);
                    set((state) => ({
                        dailyWater: state.dailyWater.map((water) =>
                            water.id === waterId ? { ...water, ...data } : water
                        ),
                    }));
                } catch (err: any) {
                    set({ error: err.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },
            deleteWater: async (id: string) => {
                try {
                    set({ isLoading: true });

                    await water.fetchDeleteWater(id);
                    set((state) => ({
                        dailyWater: state.dailyWater.filter((water) => water.id !== id),
                    }));
                } catch (err: any) {
                    set({ error: err.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },
            fetchDailyWater: async (date: string) => {
                try {
                    set({ isLoading: true });

            const data = await water.fetchDailyWater(date);
            set({
                dailyWater: data,
            });
        } catch (err: any) {
            set({ error: err.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    fetchWeeklyWater: async (date: string) => {
        try {
            set({ isLoading: true, error: null });
                    const data = await water.fetchDailyWater(date);
                    set({
                        dailyWater: data,
                    });
                } catch (err: any) {
                    set({ error: err.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },
            fetchWeeklyWater: async (date: string) => {
                try {
                    set({ isLoading: true });

            const data = await water.fetchWeeklyWater(date);
            set({ weeklyWater: data });
        } catch (err: any) {
            set({ error: err.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    fetchMonthlyWater: async (date: string) => {
        try {
            set({ isLoading: true, error: null });
                    const data = await water.fetchWeeklyWater(date);
                    set({ weeklyWater: data });
                } catch (err: any) {
                    set({ error: err.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },
            fetchMonthlyWater: async (date: string) => {
                try {
                    set({ isLoading: true });

                    const data = await water.fetchMonthlyWater(date);
                    set({ monthlyWater: data });
                } catch (err: any) {
                    set({ error: err.response.data.message });
                }
            },
        }),
        { name: 'WaterStore' }
    )
);
