import { ReactNode } from 'react';
import { Box } from '@mui/material';

export interface CustomBoxProps {
    children: ReactNode;
    className?: string;
}

const CustomItemBox = ({ children, className }: CustomBoxProps) => {
    return (
        <Box
            className={`inline-block rounded-[15px] bg-white p-[12px] ${className}`}
            sx={{ boxShadow: 'shadow-[box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.1)' }}
            component="section"
        >
            {children}
        </Box>
    );
};

export default CustomItemBox;
