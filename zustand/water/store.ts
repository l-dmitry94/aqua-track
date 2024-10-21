import dayjs from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { fetchTotalUsers } from '@/api/auth/auth.api';
import { WaterBody } from '@/api/water/water.api.types';

import * as water from '../../api/water/water.api';

import { waterStore } from './store.types';

export const useWaterStore = create<waterStore>()(
    devtools(
        (set) => ({
            isLoading: true,
            error: null,
            currentMonthState: dayjs().format('YYYY-MM-DD'),
            currentDate: dayjs().format('YYYY-MM-DD'),
            totalUsers: [],
            dailyWater: [],
            weeklyWater: [],
            monthlyWater: [],

            setCurrentDate: (date: string) => set((state) => ({ ...state, currentDate: date })),

            setCurrentMonth: (date: string) =>
                set((state) => ({ ...state, currentMonthState: date })),

            fetchTotalUsers: async () => {
                try {
                    set({ isLoading: true, error: null });

                    const data = await fetchTotalUsers();
                    set((state) => ({ ...state, totalUsers: data }));
                } catch (err: any) {
                    set({ error: err.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },

            createWater: async (body: WaterBody) => {
                try {
                    set({ isLoading: true, error: null });

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
                    set({ isLoading: true, error: null });

                    const data = await water.fetchMonthlyWater(date);
                    set({ monthlyWater: data });
                } catch (err: any) {
                    set({ error: err.response.data.message });
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        { name: 'WaterStore' }
    )
);
