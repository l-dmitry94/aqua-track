import dayjs from 'dayjs';
export interface AllWaterProcentDataType {
    [key: string]: number;
}

export interface CustomCalendarProps {
    selectedDate: dayjs.Dayjs;
    handleDateChange: (date: dayjs.Dayjs) => void;
    isLoading: boolean;
    toggleView: () => void;
    isCalendarVisible: boolean;
    currentMonth: dayjs.Dayjs;
}
