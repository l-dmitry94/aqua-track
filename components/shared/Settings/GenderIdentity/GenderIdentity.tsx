import { FC, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { IGenderIdentity } from './GenderIdentity.types';

import scss from './GenderIdentity.module.scss';

const GenderIdentity: FC<IGenderIdentity> = ({ control, gender, setValue }) => {
    useEffect(() => {
        if (gender) setValue('gender', gender);
    }, [gender, setValue]);
    return (
        <FormControl component="fieldset" className={scss.formControl}>
            <FormLabel className={scss.label}>Your gender identity</FormLabel>
            <Controller
                name="gender"
                control={control}
                defaultValue={gender || ''}
                render={({ field }) => (
                    <RadioGroup row {...field} className={scss.radioGroup}>
                        <FormControlLabel
                            value="woman"
                            control={
                                <Radio
                                    sx={{
                                        color: '#9BE1A0',
                                        '&.Mui-checked': {
                                            color: '#9BE1A0',
                                        },
                                    }}
                                    className={scss.radioButton}
                                />
                            }
                            className={scss.radio}
                            label="Woman"
                        />
                        <FormControlLabel
                            value="man"
                            control={
                                <Radio
                                    sx={{
                                        color: '#9BE1A0',
                                        '&.Mui-checked': {
                                            color: '#9BE1A0',
                                        },
                                    }}
                                    className={scss.radioButton}
                                />
                            }
                            className={scss.radio}
                            label="Man"
                        />
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};

export default GenderIdentity;
