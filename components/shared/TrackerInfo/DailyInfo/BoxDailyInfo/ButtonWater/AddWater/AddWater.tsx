import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Typography } from '@mui/material';

import { WaterBody } from '@/api/water/water.api.types';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { FormValues } from '@/components/ui/Form/Form.types';
import WaterLoader from '@/components/ui/WaterLoader';
import { useWaterStore } from '@/zustand/water/store';

import VolumeCounter from './VolumeCounter';
import WaterInputs from './WaterInputs';

import scss from './AddWater.module.scss';

export interface IAddWater {
    onClose: () => void;
    water?: WaterBody;
}

const AddWater: FC<IAddWater> = ({ onClose, water }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(water?.volume || 50);
    const { updateWater } = useWaterStore();
    const currentTime = new Date();
    const { currentDate, createWater } = useWaterStore();

    const handleSubmit = async (data: FormValues) => {
        const formData = {
            ...data,
            date: currentDate,
        };

        setIsLoading(true);

        if (water) {
            updateWater(data, water?.id);
            onClose();
            setIsLoading(false);
            toast.success('Water updated!');
            return;
        }
        createWater(formData);
        onClose();
        setIsLoading(false);
        toast.success('Water added!');
    };

    const decrement = () => {
        setAmount((prevAmount) => {
            const newAmount = Math.floor(prevAmount / 50) * 50 - 50;
            return newAmount >= 50 ? newAmount : 50;
        });
    };

    const increment = () => {
        setAmount((prevAmount) => Math.floor(prevAmount / 50) * 50 + 50);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {(register, control, setValue, errors) => (
                    <Box component="div" className={scss.addWater}>
                        <Typography component="h3" className={scss.title}>
                            Choose a value
                        </Typography>

                        <VolumeCounter
                            amount={amount}
                            onIncrement={increment}
                            onDecrement={decrement}
                            setValue={setValue}
                        />

                        <WaterInputs
                            water={water}
                            amount={amount}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                            onSetEmount={setAmount}
                            currentDate={currentTime}
                        />

                        <Button type="submit" variant="contained" className={scss.submitBtn}>
                            Save
                        </Button>
                    </Box>
                )}
            </Form>

            {isLoading && <WaterLoader />}
        </>
    );
};

export default AddWater;
