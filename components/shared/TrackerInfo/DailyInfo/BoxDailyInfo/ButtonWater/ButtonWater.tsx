'use client';
import React, { useState } from 'react';
import { Typography } from '@mui/material';

import Button from '@/components/ui/Button';
import CustomModal from '@/components/ui/CustomModal';
import Icon from '@/components/ui/Icon';

import AddWater from './AddWater';

import scss from './ButtonWater.module.scss';

const ButtonWater = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    return (
        <>
            <Button onClick={toggleModal} className={scss.waterBtn}>
                <Icon variant={'plus'} className={scss.svg} />
                <Typography component="p" className={scss.text}>
                    Add water
                </Typography>
            </Button>

            <CustomModal open={modalIsOpen} onClose={toggleModal} title="Add water">
                <AddWater onClose={toggleModal} />
            </CustomModal>
        </>
    );
};

export default ButtonWater;
