//функція для форматування часу в формат АМ або РМ
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const formatTime = (date: Date): string => {
    return dayjs(date).format('h:mm A');
};
