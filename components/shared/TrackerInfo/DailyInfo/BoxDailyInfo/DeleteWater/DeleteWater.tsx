import { FC } from 'react';

import Button from '@/components/ui/Button';
import { useWaterStore } from '@/zustand/water/store';

import { IAddWater } from '../ButtonWater/AddWater';

import scss from './DeleteWater.module.scss';

const DeleteWater: FC<IAddWater> = ({ onClose, water }) => {
    const { deleteWater } = useWaterStore();

    const handleDeleteWater = () => {
        if (water) {
            deleteWater(water.id);
            onClose();
        }
    };
    return (
        <div className={scss.wrapper}>
            <p className={scss.text}>Are you sure you want to delete the entry?</p>

            <div className={scss.buttonsGroup}>
                <Button onClick={handleDeleteWater} variant="contained" fullWidth>
                    Delete
                </Button>
                <Button onClick={onClose} className={scss.cancelButton} fullWidth>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default DeleteWater;
