import React from 'react';

import Settings from '@/components/shared/Settings';
import TrackerInfo from '@/components/shared/TrackerInfo';
import Container from '@/components/ui/Container';

const TrackerPage = () => {
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
