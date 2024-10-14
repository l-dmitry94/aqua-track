import { FC } from 'react';

import scss from './CustomTooltip.module.scss';

interface ICustomTooltip {
    active?: any;
    payload?: any;
    coordinate?: any;
}

const CustomTooltip: FC<ICustomTooltip> = ({ active, payload, coordinate }) => {
    if (active && payload) {
        return (
            <div
                style={{
                    left: `${coordinate.x}px`,
                    bottom: `-${coordinate.y}px`,
                }}
                className={scss.wrapper}
            >
                <p className={scss.label}>{payload[0].value}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
