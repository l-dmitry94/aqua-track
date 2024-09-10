import { useState } from 'react';
import { signOut } from 'next-auth/react';

export const useUserButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalType, setModalType] = useState<'logout' | 'settings' | null>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null);
        setModalType('logout');
    };

    const handleSettingsClick = () => {
        setAnchorEl(null);
        setModalType('settings');
    };

    const handleLogoutConfirm = () => {
        signOut();
    };

    const handleModalClose = () => {
        setModalType(null);
    };

    return {
        anchorEl,
        open,
        modalType,
        handleClick,
        handleClose,
        handleLogoutClick,
        handleSettingsClick,
        handleLogoutConfirm,
        handleModalClose,
    };
};
