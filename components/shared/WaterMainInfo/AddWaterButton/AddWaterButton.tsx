'use client';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

export interface AddWaterButtonProps {}

const AddWaterButton = ({}: AddWaterButtonProps) => {
    return (
        <Button
            variant="contained"
            className="absolute bottom-[32px] right-[16px]"
            style={{
                backgroundColor: '#2f2f2f',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 20px',
                width: 'auto',
            }}
            onClick={() => alert('Hello')}
        >
            <Icon variant={'plus'} className="h-[15px] w-[15px] stroke-white" />
            Add water
        </Button>
    );
};

export default AddWaterButton;
