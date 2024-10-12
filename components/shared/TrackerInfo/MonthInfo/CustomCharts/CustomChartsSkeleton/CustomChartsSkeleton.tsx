import { Box, Skeleton } from '@mui/material';

const CustomChartSkeleton = () => {
    return (
        <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton animation="wave" variant="rectangular" width={300} height={250} />
        </Box>
    );
};

export default CustomChartSkeleton;
