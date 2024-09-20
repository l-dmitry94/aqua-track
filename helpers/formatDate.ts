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

// Функція для форматування дати у форматі "день Місяць рік"
export const formatDateWithYear = (date: Date): string => {
    return format(date, 'YYYY, MMMM d');
};
