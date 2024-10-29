import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Icon from '@/components/ui/Icon';

import scss from './DailyNorma.module.scss';

const DailyNorma = () => {
    const t = useTranslations('Settings');

    return (
        <Box component="div" className={scss.dailyNorma}>
            <Typography variant="h3" className={scss.title}>
                {t('dailyNormaText')}
            </Typography>

            <List className={scss.list}>
                <ListItem disablePadding className={scss.listItem}>
                    <ListItemText className={scss.listItemTextLabel}>
                        {t('forGender.woman')}
                    </ListItemText>
                    <ListItemText className={scss.listItemText}>V=(M*0,03) + (T*0,4)</ListItemText>
                </ListItem>
                <ListItem disablePadding className={scss.listItem}>
                    <ListItemText className={scss.listItemTextLabel}>
                        {t('forGender.man')}
                    </ListItemText>
                    <ListItemText className={scss.listItemText}>V=(M*0,04) + (T*0,6)</ListItemText>
                </ListItem>
            </List>

            <Typography variant="body2" className={scss.description}>
                <Box component="span" className={scss.asterisk}>
                    *
                </Box>{' '}
                {t('description')}
            </Typography>

            <Box component="div" className={scss.activeTime}>
                <Icon variant="exclamation" className={scss.icon} />
                <Typography variant="body2" className={scss.text}>
                    {t('activeTime')}
                </Typography>
            </Box>
        </Box>
    );
};

export default DailyNorma;
