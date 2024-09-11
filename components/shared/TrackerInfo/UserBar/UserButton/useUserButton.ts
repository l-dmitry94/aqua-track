import { useState } from 'react';
import { signOut } from 'next-auth/react';

export const useUserButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [modalType, setModalType] = useState<'logout' | 'settings' | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null);
        setModalType('logout');
        setIsModalOpen(true);
    };

    const handleSettingsClick = () => {
        setAnchorEl(null);
        setModalType('settings');
        setIsModalOpen(true);
    };

    const handleLogoutConfirm = () => {
        signOut();
    };

    const handleModalClose = () => {
        setModalType(null);
        setIsModalOpen(false);
    };

    return {
        anchorEl,
        open,
        isModalOpen,
        modalType,
        handleClick,
        handleClose,
        handleLogoutClick,
        handleSettingsClick,
        handleLogoutConfirm,
        handleModalClose,
    };
};
