import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

import { ItemListDailyInfoProps } from './types';

const ItemListDailyInfo: React.FC<ItemListDailyInfoProps> = ({ dataItem }) => {
    const { value, time } = dataItem.value;
    return (
        <ListItem>
            <ListItemText primary={`Value: ${value}, Time: ${time}`} />
        </ListItem>
    );
};

export default ItemListDailyInfo;
