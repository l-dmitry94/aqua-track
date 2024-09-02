import React from 'react';
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import Image from 'next/image';

import Icon from '@/components/ui/Icon';
import { waterGlassImage } from '@/public/images/dailyInfo';

import { ItemListDailyInfoProps } from './types';

import scss from './ItemListDailyInfo.module.scss';

const ItemListDailyInfo: React.FC<ItemListDailyInfoProps> = ({ dataItem }) => {
    const { volume, time } = dataItem;
    return (
        <ListItem className={scss.item}>
            <Image width={44} height={45} src={waterGlassImage} alt="Water glass" />
            <Box component="div" className={scss.wrapper}>
                <Box component="div" className={scss.wrapperInfo}>
                    <Typography component="p" className={scss.textValue}>
                        {`${volume} ml`}
                    </Typography>
                    <IconButton size="small">
                        <Icon variant="edit" className={scss.svg} />
                    </IconButton>
                </Box>
                <Box component="div" className={scss.wrapperInfo}>
                    <Typography component="p" className={scss.textTime}>
                        {time}
                    </Typography>
                    <IconButton size="small">
                        <Icon variant="trash" className={scss.svg} />
                    </IconButton>
                </Box>
            </Box>
        </ListItem>
    );
};

export default ItemListDailyInfo;
