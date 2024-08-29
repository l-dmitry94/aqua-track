import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

import Icon from '@/components/ui/Icon';

import scss from './DailyNorma.module.scss';

const DailyNorma = () => {
    return (
        <Box component="div">
            <Typography variant="h3">My daily norma</Typography>

            <List>
                <ListItem>
                    <ListItemText>For woman:</ListItemText>
                    <ListItemText>V=(M*0,03) + (T*0,4)</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>For man:</ListItemText>
                    <ListItemText>V=(M*0,04) + (T*0,6)</ListItemText>
                </ListItem>
            </List>

            <Typography variant="body2" className={scss.description}>
                <Box component="span" className={scss.asterisk}>
                    *
                </Box>{' '}
                V is the volume of the water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate in terms of loads
                (in the absence of these, you must set 0)
            </Typography>

            <Box component="div">
                <Icon variant="exclamation" />
                <Typography variant="body2">Active time in hours</Typography>
            </Box>
        </Box>
    );
};

export default DailyNorma;
