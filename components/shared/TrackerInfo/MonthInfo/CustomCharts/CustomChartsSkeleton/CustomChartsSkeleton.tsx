import { Box, Skeleton } from '@mui/material';

import scss from './CustomCahrtSkeleton.module.scss';

const CustomChartSkeleton = () => {
    return (
        <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton animation="wave" variant="rounded" className={scss.chartSkeleton} />
        </Box>
    );
};

export default CustomChartSkeleton;
