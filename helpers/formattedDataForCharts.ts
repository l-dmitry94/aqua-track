import { eachDayOfInterval, format, subDays } from 'date-fns';

function formattedDataForChart(weeklyWater: any[], referenceDate: string) {
    const startDay = new Date(referenceDate);
    const endDay = subDays(startDay, 6);

    const daysOfWeek = eachDayOfInterval({
        start: endDay,
        end: startDay,
    }).map((date) => format(date, 'yyyy-MM-dd'));

    const volumeByDate = weeklyWater.reduce((acc, item) => {
        acc[item.date] = (acc[item.date] || 0) + item.volume;
        return acc;
    }, {});

    const data = daysOfWeek.map((date) => ({
        name: parseInt(date.split('-')[2]),
        pv: volumeByDate[date] || 0,
    }));

    return [{ name: -100, pv: 0 }, ...data, { name: 100, pv: 0 }];
}

export default formattedDataForChart;
