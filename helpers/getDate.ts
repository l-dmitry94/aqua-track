// функція на перевірку чи день сьогоднішній
export const isToday = (date: Date) => {
    const today = new Date();
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateOnly.getTime() === todayOnly.getTime();
};
// Функція для форматування дати у форматі "день Місяць"
export const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    return `${day}, ${month}`;
};
