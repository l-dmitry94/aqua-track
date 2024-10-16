'use client';
import { Box } from '@mui/material';

import Container from '@/components/ui/Container';

import AuthWrapper from './AuthWrapper';
import WelcomeAdvantages from './WelcomeAdvantages';
import WelcomeInfo from './WelcomeInfo';

import scss from './Welcome.module.scss';

const Welcome = () => {
    return (
        <Box component="section" className={scss.section}>
            <Container>
                <Box component="div" className={scss.wrapper}>
                    <AuthWrapper>
                        <WelcomeInfo />
                    </AuthWrapper>

                    <WelcomeAdvantages />
                </Box>
            </Container>
        </Box>
    );
};

export default Welcome;
