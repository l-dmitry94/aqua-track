import React from 'react';
import SimpleBar from 'simplebar-react';

import { CustomScrollBarProps } from './types';

import 'simplebar-react/dist/simplebar.min.css';

const CustomScrollBar: React.FC<CustomScrollBarProps> = ({ children, style }) => {
    return (
        <SimpleBar style={style} className="scrollBar" autoHide={false}>
            {children}
        </SimpleBar>
    );
};

export default CustomScrollBar;
