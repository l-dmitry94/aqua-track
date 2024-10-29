import { ChangeEventHandler, FC, useEffect } from 'react';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import Input from '@/components/ui/Input';

import { IWaterInputs } from './WaterInputs.types';

import scss from './WaterInputs.module.scss';

const WaterInputs: FC<IWaterInputs> = ({
    register,
    errors,
    setValue,
    amount,
    water,
    onSetEmount,
}) => {
    const t = useTranslations('Water');
    const time = water?.time || format(new Date(), 'HH:mm');

    useEffect(() => {
        setValue('volume', amount);
    }, [amount, setValue]);

    const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = Number(event.target.value);
        onSetEmount(newValue);
    };

    return (
        <div className={scss.inputs}>
            <Input
                register={register}
                errors={errors}
                name={'time' as never}
                type={'time'}
                label={t('recordingTime')}
                light
                defaultValue={time}
                placeholder={''}
            />
            <Input
                register={register}
                errors={errors}
                name={'volume' as never}
                type={'number'}
                onChange={handleVolumeChange}
                label={t('volumeValue')}
                placeholder={''}
                value={amount}
            />
        </div>
    );
};

export default WaterInputs;
