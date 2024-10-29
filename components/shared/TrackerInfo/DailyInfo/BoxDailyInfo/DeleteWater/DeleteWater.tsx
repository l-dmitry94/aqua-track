import { FC } from 'react';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/Button';
import { useWaterStore } from '@/zustand/water/store';

import { IAddWater } from '../ButtonWater/AddWater';

import scss from './DeleteWater.module.scss';

const DeleteWater: FC<IAddWater> = ({ onClose, water }) => {
    const t = useTranslations('DeleteWater');
    const { deleteWater } = useWaterStore();

    const handleDeleteWater = () => {
        if (water) {
            deleteWater(water.id);
            onClose();
        }
    };
    return (
        <div className={scss.wrapper}>
            <p className={scss.text}>{t('text')}</p>

            <div className={scss.buttonsGroup}>
                <Button onClick={handleDeleteWater} variant="contained" fullWidth>
                    {t('delete')}
                </Button>
                <Button onClick={onClose} className={scss.cancelButton} fullWidth>
                    {t('cancel')}
                </Button>
            </div>
        </div>
    );
};

export default DeleteWater;
