import { Box, Skeleton } from '@mui/material';

const CustomersSkeleton = () => {
    return (
        <Box
            className="justify-content absolute bottom-[132px] left-8 flex h-[68px] w-[242px] gap-[4px] rounded-custom bg-white px-[14px] py-[10px]"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '4px',
            }}
        >
            <Skeleton
                sx={{ display: 'flex', gap: '4px', justifyContent: 'space-between' }}
                className="flex w-1/2 justify-between gap-[4px]"
            >
                <Skeleton className="h-[48px] w-[48px] rounded-full" />
                <Skeleton className="h-[48px] w-[48px] rounded-full" />
                <Skeleton className="h-[48px] w-[48px] rounded-full" />
            </Skeleton>
            <Skeleton className="h-full w-1/2" />
        </Box>
    );
};

export { CustomersSkeleton };
