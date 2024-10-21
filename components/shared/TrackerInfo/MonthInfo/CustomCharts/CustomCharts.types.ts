import dayjs from 'dayjs';
export interface CustomChartsProps {
    ontoggleView: () => void;
    onMonthChange: (newMonth: dayjs.Dayjs, direction: 'left' | 'right') => void;
}
