'use client';
import { MouseEvent, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { setUserLocale } from '@/api/locale/locale';
import { Locale } from '@/i18n/config';

import Icon from '../Icon';

import scss from './LangSwitcher.module.scss';

const LangSwitcher = () => {
    const [alignment, setAlignment] = useState<Locale>('en');

    const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: Locale) => {
        if (newAlignment) {
            setAlignment(newAlignment);
            setUserLocale(newAlignment);
        }
    };
    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="language switcher"
            className={scss.buttonGroup}
        >
            <ToggleButton value="en" className={scss.button}>
                <Icon variant="en" className={scss.icon} />
            </ToggleButton>
            <ToggleButton value="ua" className={scss.button}>
                <Icon variant="ua" className={scss.icon} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default LangSwitcher;
