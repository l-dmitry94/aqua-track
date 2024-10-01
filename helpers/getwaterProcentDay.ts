export const getWaterProcentDay = (volumes: number[], normaDailyWater: number) => {
    const totalVolume = volumes.reduce((acc, volume) => acc + volume, 0);
    // console.log(totalVolume, normaDailyWater);
    const procentWater = (totalVolume * 100) / normaDailyWater;
    return Math.round(procentWater);
};