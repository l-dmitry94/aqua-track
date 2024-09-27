import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';
export interface WaterProcentData {
    [key: string]: number;
}

export interface BadgeWaterProcentProps extends PickersDayProps<Dayjs> {
    highlightedDays?: number[];
    waterProcentData?: WaterProcentData;
}
