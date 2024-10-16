const dailyNorma = (
    volume: number | undefined,
    gender: 'woman' | 'man' | undefined,
    activeTime: number | undefined,
    weight: number | undefined
) => {
    if (
        activeTime !== undefined &&
        weight !== undefined &&
        gender !== undefined &&
        volume !== undefined
    ) {
        const normalizeVolume = volume / 1000;
        const dailyNormaForWoman = weight * 0.03 + activeTime * 0.4;
        const dailyNormaForMan = weight * 0.04 + activeTime * 0.6;
        const dailyNorma =
            normalizeVolume !== 1.8
                ? gender === 'woman'
                    ? dailyNormaForWoman
                    : dailyNormaForMan
                : 1.8;

        return dailyNorma.toFixed(2);
    }
};

export default dailyNorma;
