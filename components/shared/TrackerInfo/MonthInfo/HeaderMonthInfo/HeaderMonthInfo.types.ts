import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import { Dayjs } from 'dayjs';

export interface HeaderMonthInfoProps extends PickersCalendarHeaderProps<Dayjs> {
    isCalendarVisible?: boolean;
    onToggleView: () => void;
}
