import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/Button';

import scss from './WelcomeInfo.module.scss';

const WelcomeInfo = () => {
    const t = useTranslations('Welcome');

    return (
        <Box component="section" className={scss.section}>
            <Typography variant="body2" className={scss.subtitle}>
                {t('description')}
            </Typography>
            <Typography variant="h1" className={scss.title}>
                {t('title')}
            </Typography>

            <Box component="div" className={scss.buttonsWrapper}>
                <Link href="/signup">
                    <Button type="button" variant="contained">
                        {t('primaryButton')}
                    </Button>
                </Link>
                <Link href="/signin">
                    <Button type="button" variant="outlined">
                        {t('secondaryButton')}
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default WelcomeInfo;
