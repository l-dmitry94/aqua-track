type IconVariant =
    | 'chevron-down'
    | 'chevron-left'
    | 'close'
    | 'edit'
    | 'eye'
    | 'eye-off'
    | 'logout'
    | 'pie-chart'
    | 'plus'
    | 'settings'
    | 'trash'
    | 'upload';

export interface IIcon {
    variant: IconVariant;
    className?: string;
}
