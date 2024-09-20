import dayjs from 'dayjs';
export const getWaterProcentDay = (volumes: number[], normaDailyWater: number) => {
    const totalVolume = volumes.reduce((acc, volume) => acc + volume, 0);
    // console.log(totalVolume, normaDailyWater);
    const procentWater = (totalVolume * 100) / normaDailyWater;
    return Math.round(procentWater);
};

export const getWaterProcentForMonth = (entries, normaDailyWater) => {
    const waterProcentData = {};

    entries.forEach((entry) => {
        const date = dayjs(entry.date).format('YYYY-MM-DD');
        if (!waterProcentData[date]) {
            waterProcentData[date] = 0;
        }
        // Accumulate the total volume of water for each day
        waterProcentData[date] += entry.volume;
    });

    // Calculate the percentage for each day
    Object.keys(waterProcentData).forEach((date) => {
        waterProcentData[date] = Math.round((waterProcentData[date] * 100) / normaDailyWater);
    });

    return waterProcentData;
};
