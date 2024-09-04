'use client';

import { FC, useState } from 'react';

import Container from '@/components/ui/Container';
import CustomModal from '@/components/ui/CustomModal';

const HomePage: FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <Container>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <CustomModal
                open={modalIsOpen}
                title="Hello"
                onClose={() => setModalIsOpen(false)}
                profile
            >
                My name is Dima
            </CustomModal>
            <p>HomePage</p>
        </Container>
    );
};

export default HomePage;
