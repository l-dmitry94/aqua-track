'use client';

import { FC, useState } from 'react';

import Container from '@/components/ui/Container';
import Modal from '@/components/ui/Modal';

const HomePage: FC = () => {
    const [modalOpen, setModalOpen] = useState(true);

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <Container>
            <Modal open={modalOpen} onClose={handleClose} title="Modal window">
                <p>Тут щось буде</p>
            </Modal>
            <p>HomePage</p>
        </Container>
    );
};

export default HomePage;
