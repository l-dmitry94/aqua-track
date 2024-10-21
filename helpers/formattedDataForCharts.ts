import { eachDayOfInterval, format, subDays } from 'date-fns';

function formattedDataForChart(weeklyWater: any[], referenceDate: string) {
    const startDay = new Date(referenceDate);
    const endDay = subDays(startDay, 6);

    const daysOfWeek = eachDayOfInterval({
        start: endDay,
        end: startDay,
    });

    const volumeByDate = weeklyWater.reduce((acc, item) => {
        acc[item.date] = (acc[item.date] || 0) + item.volume;
        return acc;
    }, {});

    const data = daysOfWeek.map((date) => ({
        name: date.getDate(),
        pv: volumeByDate[format(date, 'yyyy-MM-dd')] || 0,
    }));

    return data;
}

export default formattedDataForChart;
