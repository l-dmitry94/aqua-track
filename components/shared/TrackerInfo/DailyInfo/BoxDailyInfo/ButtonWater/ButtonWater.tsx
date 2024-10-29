'use client';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/Button';
import CustomModal from '@/components/ui/CustomModal';
import Icon from '@/components/ui/Icon';

import AddWater from './AddWater';

import scss from './ButtonWater.module.scss';

const ButtonWater = () => {
    const t = useTranslations();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    return (
        <>
            <Button onClick={toggleModal} className={scss.waterBtn}>
                <Icon variant={'plus'} className={scss.svg} />
                <Typography component="p" className={scss.text}>
                    {t('MainInfo.button')}
                </Typography>
            </Button>

            <CustomModal open={modalIsOpen} onClose={toggleModal} title={t('Water.addTitle')}>
                <AddWater onClose={toggleModal} />
            </CustomModal>
        </>
    );
};

export default ButtonWater;
