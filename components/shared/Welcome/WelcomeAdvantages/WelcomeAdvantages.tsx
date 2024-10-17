import { FC, useEffect } from 'react';
import { Avatar, AvatarGroup, Box, List, ListItem, Typography } from '@mui/material';
import clsx from 'clsx';

import { CustomersSkeleton } from '@/components/shared/Welcome/WelcomeAdvantages/Skeleton/CustomersSkeleton';
import {
    bg_desk_1x,
    bg_desk_2x,
    bg_mob_1x,
    bg_mob_2x,
    bg_tab_1x,
    bg_tab_2x,
} from '@/public/images/advantages';
import { useWaterStore } from '@/zustand/water/store';
import { TotalUsersTypes } from '@/zustand/water/store.types';

import advantages from './advantages';

import scss from './WelcomeAdvantages.module.scss';

interface IWelcomeAdvantages {
    desktop?: boolean;
}

const WelcomeAdvantages: FC<IWelcomeAdvantages> = ({ desktop }) => {
    const { totalUsers, fetchTotalUsers, isLoading } = useWaterStore();

    const userAvatars: TotalUsersTypes[] = totalUsers.filter(
        (item) => item.image !== null && item.image !== undefined
    );
    console.log(userAvatars);
    useEffect(() => {
        fetchTotalUsers();
    }, [totalUsers.length]);
    return (
        <Box
            component="section"
            className={clsx(scss.container, scss.section, desktop && scss.desktop)}
        >
            <Box component="picture">
                <Box
                    component="source"
                    media="(min-width: 1440px)"
                    srcSet={`${bg_desk_1x.src} 1x, ${bg_desk_2x.src} 2x`}
                />
                <Box
                    component="source"
                    media="(min-width: 768px)"
                    srcSet={`${bg_tab_1x.src} 1x, ${bg_tab_2x.src} 2x`}
                />
                <Box
                    component="img"
                    src={bg_mob_1x.src}
                    srcSet={`${bg_mob_1x.src} 1x, ${bg_mob_2x.src} 2x`}
                    alt="Woman drinking water"
                    className={scss.image}
                />
            </Box>

            {isLoading ? (
                <CustomersSkeleton />
            ) : (
                <Box component="section" className={scss.customers}>
                    <AvatarGroup
                        max={4}
                        total={totalUsers.length}
                        className={scss.customersGroup}
                        slotProps={{
                            additionalAvatar: {
                                className: scss.slotAvatar,
                            },
                        }}
                    >
                        {userAvatars.map(({ image, id }) => (
                            <Avatar src={image || undefined} key={id} className={scss.avatar} />
                        ))}
                    </AvatarGroup>
                    <Typography variant="body2" className={scss.text}>
                        Our{' '}
                        <Box component="span" className={scss.textColor}>
                            happy{' '}
                        </Box>
                        customers
                    </Typography>
                </Box>
            )}

            <Box component="section" className={scss.advantages}>
                <List disablePadding className={scss.advantagesList}>
                    {advantages.map((advantage) => (
                        <ListItem disableGutters key={advantage} className={scss.advantage}>
                            {advantage}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default WelcomeAdvantages;
