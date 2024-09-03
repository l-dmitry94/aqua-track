// функція на перевірку чи день сьогоднішній
import { isToday } from 'date-fns';

export const isTodayDate = (date: Date): boolean => {
    return isToday(date);
};

// Функція для форматування дати у форматі "день Місяць"
import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
    return format(date, 'd, MMMM');
};
