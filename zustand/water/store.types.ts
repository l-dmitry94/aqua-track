import { WaterBody, WaterResponse } from '@/api/water/water.api.types';
export type waterStore = {
    isLoading: boolean;
    error: string | null;
    currentMonthState: string;
    currentDate: string;
    totalUsers: TotalUsersTypes[];
    fetchTotalUsers: () => void;
    dailyWater: WaterResponse[];
    weeklyWater: WaterResponse[];
    monthlyWater: WaterResponse[];
    setCurrentDate: (date: string) => void;
    setCurrentMonth: (date: string) => void;
    createWater: (body: WaterBody) => void;
    updateWater: (body: WaterBody, waterId: string) => void;
    deleteWater: (id: string) => void;
    fetchDailyWater: (date: string) => void;
    fetchWeeklyWater: (date: string) => void;
    fetchMonthlyWater: (date: string) => void;
};

export type TotalUsersTypes = {
    id: string;
    image: string | null;
};
