import React, { FC, ReactNode } from 'react';
import { Backdrop, Box, Fade, IconButton, Modal, Typography } from '@mui/material';
import clsx from 'clsx';

import Button from '@/components/ui/Button/Button';
import Icon from '@/components/ui/Icon/Icon';

import scss from './CustomModal.module.scss';

interface CustomModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}

const CustomModal: FC<CustomModalProps> = ({
    open,
    handleClose,
    title,
    children,
    variant = 'primary',
}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
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
                <Box className={clsx(scss.modalBox, scss[variant])}>
                    <IconButton
                        className={scss.closeButton}
                        onClick={handleClose}
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
                    <Button variant="contained" onClick={handleClose} className={scss.button}>
                        Save
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
