import { Box, Skeleton } from '@mui/material';

export const SkeletonNorma = () => {
    return (
        <Box
            component="div"
            className="mt-[78px] inline-block h-[54px] w-[102px] rounded-[15px] bg-white p-[12px]"
        >
            <Skeleton sx={{ height: '14px', width: '35px' }} />
            <Skeleton sx={{ height: '14px', width: '75px' }} />
        </Box>
    );
};

export const SkeletonProgressBar = () => {
    return (
        <Box
            component="div"
            className="absolute left-1/2 top-1/2 flex h-[108px] w-[308px] translate-x-[-50%] flex-col gap-[20px] rounded-[15px] bg-white p-[12px]"
        >
            <Skeleton className="h-[14px] w-[50px]" />
            <Skeleton className="h-[50px] w-full" />
        </Box>
    );
};
