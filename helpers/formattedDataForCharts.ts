import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

function formattedDataForChart(weeklyWater: any[], referenceDate: string) {
    const startWeek = startOfWeek(new Date(referenceDate));
    const endWeek = endOfWeek(new Date(referenceDate));

    const daysOfWeek = eachDayOfInterval({
        start: startWeek,
        end: endWeek,
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
