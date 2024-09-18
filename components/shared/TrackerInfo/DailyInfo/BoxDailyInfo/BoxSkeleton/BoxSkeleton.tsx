import { Box, List, ListItem, Skeleton } from '@mui/material';
import clsx from 'clsx';

import scssList from '../BoxDailyInfo.module.scss';
import scssItem from '../ItemListDailyInfo/ItemListDailyInfo.module.scss';
import scss from './BoxSkeleton.module.scss';

const BoxSkeleton = () => {
    return (
        <>
            <List className={scssList.list}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <ListItem key={index} className={clsx(scssList.item, scssItem.item)}>
                        <Skeleton variant="rectangular" width={40} height={35} />
                        <Box component="div" className={scssItem.wrapper}>
                            <Box component="div" className={scssItem.wrapperInfo}>
                                <Skeleton width="50%" height={18} />
                                <Skeleton width={35} height={18} />
                            </Box>
                            <Box component="div" className={scssItem.wrapperInfo}>
                                <Skeleton width="50%" height={18} />
                                <Skeleton width={35} height={18} />
                            </Box>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Skeleton animation="wave" className={scss.scroll} />
        </>
    );
};

export default BoxSkeleton;
