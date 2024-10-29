'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

import TrackerInfo from '@/components/shared/TrackerInfo';
import { WaterMainInfo } from '@/components/shared/WaterMainInfo';
import Container from '@/components/ui/Container';
import LangSwitcher from '@/components/ui/LangSwitcher';

import scss from './Tracker.module.scss';

const TrackerPage = () => {
    const router = useRouter();
    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (!session) {
                router.push('/signin');
            }
        };
        fetchSession();
    }, [router]);

    return (
        <div>
            <Container>
                <LangSwitcher />
                <div className={scss.trackerContainer}>
                    <TrackerInfo />
                    <WaterMainInfo />
                </div>
            </Container>
        </div>
    );
};

export default TrackerPage;
