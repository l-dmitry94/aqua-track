import React, { FC, ReactNode } from 'react';
import { Backdrop, Box, Fade, IconButton, Modal, Typography } from '@mui/material';
import clsx from 'clsx';

import Icon from '@/components/ui/Icon/Icon';

import scss from './CustomModal.module.scss';

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    profile?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({
    open,
    onClose,
    title,
    children,
    variant = 'primary',
    profile = false,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box component="div" className={scss.wrapper}>
                    <Box className={clsx(scss.modalBox, scss[variant], profile && scss.profile)}>
                        <IconButton
                            className={scss.closeButton}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <Icon variant="close" />
                        </IconButton>
                        <Typography id="modal-title" className={scss.title} component="h2">
                            {title}
                        </Typography>
                        <div id="modal-content" className={scss.content}>
                            {children}
                        </div>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
