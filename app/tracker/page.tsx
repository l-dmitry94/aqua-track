import React from 'react';

import Settings from '@/components/shared/Settings';
import TrackerInfo from '@/components/shared/TrackerInfo';
import { WaterMainInfo } from '@/components/shared/WaterMainInfo';
import Container from '@/components/ui/Container';

const TrackerPage = () => {
    return (
        <div>
            <Container>
                <TrackerInfo />
                <WaterMainInfo />
                <Settings />
            </Container>
        </div>
    );
};

export default TrackerPage;
