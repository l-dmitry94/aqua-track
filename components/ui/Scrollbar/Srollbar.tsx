import React from 'react';
import clsx from 'clsx';
import SimpleBar from 'simplebar-react';

import { CustomScrollBarProps } from './Scrollbar.types';

import 'simplebar-react/dist/simplebar.min.css';

const CustomScrollBar: React.FC<CustomScrollBarProps> = ({ children, style, profile }) => {
    return (
        <SimpleBar
            style={style}
            className={clsx('scrollBar', profile && 'profile')}
            autoHide={false}
        >
            {children}
        </SimpleBar>
    );
};

export default CustomScrollBar;
