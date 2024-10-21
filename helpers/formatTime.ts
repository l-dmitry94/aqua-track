//функція для форматування часу в формат АМ або РМ
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const formatTime = (timeString: string): string => {
    const [hour, minute] = timeString.split(':').map(Number);
    const date = dayjs().hour(hour).minute(minute);
    return date.format('h:mm A');
};
