import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import TrackerInfo from '@/components/shared/TrackerInfo';
import Container from '@/components/ui/Container';
import { authOptions } from '@/lib/authOptions';

const TrackerPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signin');
    }
    return (
        <div>
            <Container>
                <TrackerInfo />
            </Container>
        </div>
    );
};

export default TrackerPage;
