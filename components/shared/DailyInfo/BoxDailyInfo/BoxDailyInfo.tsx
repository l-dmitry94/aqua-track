import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

import { formatDate, isToday } from '@/helpers/getDate';

import data from '../data.json';

import scss from './BoxDailyInfo.module.scss';
// import { DailyInfoTypes } from '../types';

const MySection: React.FC = () => {
    const dateObj = new Date(data.date);
    const displayDate = isToday(dateObj) ? 'Today' : formatDate(dateObj);
    return (
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.topBox}>
                <Typography variant="h4" component="h2">
                    {displayDate}
                </Typography>

                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                    Натисніть Мене
                </Button>
            </Box>

            <List>
                <ListItem>
                    <ListItemText primary="Елемент 1" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Елемент 2" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Елемент 3" />
                </ListItem>
            </List>
        </Box>
    );
};

export default MySection;
