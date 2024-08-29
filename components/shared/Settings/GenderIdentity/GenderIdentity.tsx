import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { IGenderIdentity } from './GenderIdentity.types';

const GenderIdentity: FC<IGenderIdentity> = ({ control }) => {
    return (
        <FormControl component="fieldset">
            <FormLabel>Your gender identity</FormLabel>
            <Controller
                name="gender"
                control={control}
                defaultValue="woman"
                render={({ field }) => (
                    <RadioGroup row {...field}>
                        <FormControlLabel value="woman" control={<Radio />} label="Woman" />
                        <FormControlLabel value="man" control={<Radio />} label="Man" />
                    </RadioGroup>
                )}
            />
        </FormControl>
    );
};

export default GenderIdentity;
