import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import Button from '@/components/ui/Button';

import scss from './WelcomeInfo.module.scss';

const WelcomeInfo = () => {
    return (
        <Box component="section" className={scss.section}>
            <Typography variant="body2" className={scss.subtitle}>
                Record daily water intake and track
            </Typography>
            <Typography variant="h1" className={scss.title}>
                Water consumption tracker
            </Typography>

            <Box component="div" className={scss.buttonsWrapper}>
                <Link href="/signup">
                    <Button type="button" variant="contained">
                        Try tracker
                    </Button>
                </Link>
                <Link href="/signin">
                    <Button type="button" variant="outlined">
                        Sign In
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default WelcomeInfo;
