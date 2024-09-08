import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import Settings from '@/components/shared/Settings';
import TrackerInfo from '@/components/shared/TrackerInfo';
import Container from '@/components/ui/Container';

import { authOptions } from '../api/auth/[...nextauth]/route';

const TrackerPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signin');
    }
    return (
        <div>
            <Container>
                <TrackerInfo />
                <Settings />
            </Container>
        </div>
    );
};

export default TrackerPage;
