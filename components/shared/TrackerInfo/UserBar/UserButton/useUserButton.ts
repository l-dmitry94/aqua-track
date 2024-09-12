import { useState } from 'react';
import { signOut } from 'next-auth/react';

export const useUserButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isSettinsOpen, setIsSettingsOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null);
        setIsLogoutOpen(true);
    };

    const handleSettingsClick = () => {
        setAnchorEl(null);
        setIsSettingsOpen(true);
    };

    const handleLogoutConfirm = () => {
        signOut();
    };

    const handleModalClose = () => {
        setIsLogoutOpen(false);
        setIsSettingsOpen(false);
    };

    return {
        anchorEl,
        open,
        isLogoutOpen,
        isSettinsOpen,
        handleClick,
        handleClose,
        handleLogoutClick,
        handleSettingsClick,
        handleLogoutConfirm,
        handleModalClose,
    };
};
