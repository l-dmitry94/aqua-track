import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { FormValues } from '@/components/ui/Form/Form.types';

import VolumeCounter from './VolumeCounter';
import WaterInputs from './WaterInputs';

import scss from './AddWater.module.scss';

const AddWater = () => {
    const [amount, setAmount] = useState(50);

    const handleSubmit = (data: FormValues) => {
        console.log(data);
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
                        amount={amount}
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        onSetEmount={setAmount}
                    />

                    <Button type="submit" variant="contained" className={scss.submitBtn}>
                        Save
                    </Button>
                </Box>
            )}
        </Form>
    );
};

export default AddWater;
