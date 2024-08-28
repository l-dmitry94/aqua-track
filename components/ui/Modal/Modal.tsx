'use client';

import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    SlideProps,
} from '@mui/material';

import Button from '../Button/Button';

import scss from './Modal.module.scss';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const SlideTransition = (props: SlideProps) => <Slide direction="down" {...props} />;

const Modal: FC<ModalProps> = ({ open, onClose, title, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={SlideTransition}
            className={scss.modal}
        >
            <DialogTitle id="modal-title" className={scss.title}>
                {title}
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    className={scss.closeButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={scss.content}>
                {children}
            </DialogContent>
            <DialogActions className={scss.actions}>
                <Button onClick={onClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
