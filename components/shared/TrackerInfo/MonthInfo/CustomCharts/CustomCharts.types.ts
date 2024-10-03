import dayjs from 'dayjs';
export interface CustomChartsProps {
    currentMonth: dayjs.Dayjs;
    ontoggleView: () => void;
    onMonthChange: (newMonth: dayjs.Dayjs, direction: 'left' | 'right') => void;
}
