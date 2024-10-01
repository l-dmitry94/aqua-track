import instance from '@/api/axios.config';
import ENDPOINTS from '@/api/endpoints';
import { WaterBody, WaterResponse } from '@/api/water/water.api.types';

export const fetchCreateWater = async (body: WaterBody) => {
    const { data } = await instance.post(ENDPOINTS.water.createWater, body);
    return data;
};

export const fetchUpdateWater = async (body: WaterBody, waterId: string) => {
    const data: WaterResponse = await instance.put(
        `${ENDPOINTS.water.updateWater}/${waterId}`,
        body
    );
    return data;
};

export const fetchDeleteWater = async (id: string) => {
    const { data } = await instance.delete(`${ENDPOINTS.water.deleteWater}/${id}`);
    return data;
};

export const fetchDailyWater = async (date: string) => {
    const { data } = await instance.get(`${ENDPOINTS.water.dailyWater}/${date}`);
    return data;
};

export const fetchWeeklyWater = async (date: string) => {
    const { data } = await instance.get(`${ENDPOINTS.water.weeklyWater}/${date}`);
    return data;
};

export const fetchMonthlyWater = async (date: string) => {
    const { data } = await instance.get(`${ENDPOINTS.water.monthlyWater}/${date}`);
    return data;
};
