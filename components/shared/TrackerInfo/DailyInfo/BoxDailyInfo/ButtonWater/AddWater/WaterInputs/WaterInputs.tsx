import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { format } from 'date-fns';

import Input from '@/components/ui/Input';

import fields from './fields';
import { IWaterInputs } from './WaterInputs.types';

import scss from './WaterInputs.module.scss';

const WaterInputs: FC<IWaterInputs> = ({ register, errors, setValue, amount, onSetEmount }) => {
    const [time, setTime] = useState(() => {
        const current = new Date();
        return format(current, 'HH:mm');
    });
    useEffect(() => {
        setValue('volume', amount);
        setValue('time', time);
    }, [amount, setValue, time]);

    const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = Number(event.target.value);
        onSetEmount(newValue);
    };

    const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTime(event.target.value);
    };

    return (
        <div className={scss.inputs}>
            {fields.map(({ name, label, type, light }) => (
                <Input
                    key={name}
                    register={register}
                    errors={errors}
                    name={name as never}
                    type={type}
                    label={label}
                    light={light}
                    onChange={
                        name === 'volume'
                            ? handleVolumeChange
                            : name === 'time'
                              ? handleTimeChange
                              : undefined
                    }
                    value={name === 'volume' ? amount : name === 'time' ? time : undefined}
                    placeholder={''}
                />
            ))}
        </div>
    );
};

export default WaterInputs;
