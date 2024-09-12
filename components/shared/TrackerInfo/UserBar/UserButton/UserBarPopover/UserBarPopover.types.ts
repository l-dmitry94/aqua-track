import { MouseEventHandler } from 'react';
export interface UserBarPopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClick: MouseEventHandler<HTMLDivElement>;
    handleClose: () => void;
    name: string;
    image: string;
    handleLogoutClick: () => void;
    handleSettingsClick: () => void;
}
