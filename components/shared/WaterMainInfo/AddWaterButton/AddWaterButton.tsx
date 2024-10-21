'use client';

import React, { useState } from 'react';

import AddWater from '@/components/shared/TrackerInfo/DailyInfo/BoxDailyInfo/ButtonWater/AddWater';
import Button from '@/components/ui/Button';
import CustomModal from '@/components/ui/CustomModal';
import Icon from '@/components/ui/Icon';

export interface AddWaterButtonProps {}

const AddWaterButton = ({}: AddWaterButtonProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    return (
        <>
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
                onClick={toggleModal}
            >
                <Icon variant={'plus'} className="h-[15px] w-[15px] stroke-white" />
                Add water
            </Button>
            <CustomModal open={modalIsOpen} onClose={toggleModal} title="Add water">
                <AddWater onClose={toggleModal} />
            </CustomModal>
        </>
    );
};

export default AddWaterButton;
