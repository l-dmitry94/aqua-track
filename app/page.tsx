'use client';

import { FC, useState } from 'react';

import Container from '@/components/ui/Container';
import CustomModal from '@/components/ui/CustomModal/CustomModal';

const HomePage: FC = () => {
    const [modalOpen, setModalOpen] = useState(true);

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <Container>
            <CustomModal open={modalOpen} handleClose={handleClose} title="Modal window">
                <p>Тут щось буде</p>
            </CustomModal>
            <p>HomePage</p>
        </Container>
    );
};

export default HomePage;
