export interface UserModalProps {
    open: boolean;
    onClose: () => void;
    modalType: 'settings' | 'logout';
    onLogoutConfirm?: () => void;
}
