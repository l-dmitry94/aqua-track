//функція для форматування часу в формат АМ або РМ
import { format } from 'date-fns';

export const formatTime = (date: Date): string => {
    return format(date, 'h:mm a');
};
