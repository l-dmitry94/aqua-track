'use client';
import React, { useEffect, useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import { format, isToday, parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';

import { WaterResponse } from '@/api/water/water.api.types';
import CustomModal from '@/components/ui/CustomModal';
import CustomScrollBar from '@/components/ui/Scrollbar/Srollbar';
import { formatTime } from '@/helpers/formatTime';
import { useWaterStore } from '@/zustand/water/store';

import { DailyInfoResponse } from '../DailyInfo.types';

import AddWater from './ButtonWater/AddWater';
import BoxSkeleton from './BoxSkeleton';
import ButtonWater from './ButtonWater';
import DeleteWater from './DeleteWater';
import ItemListDailyInfo from './ItemListDailyInfo';

import scss from './BoxDailyInfo.module.scss';

const BoxDailyInfo: React.FC<{ data: DailyInfoResponse }> = () => {
    const t = useTranslations();
    const { currentDate, dailyWater } = useWaterStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [water, setWater] = useState<WaterResponse | undefined>(undefined);
    const date = currentDate ? parseISO(currentDate) : new Date();
    const [isLoading, setIsLoading] = useState(true);
    const showList = dailyWater.length === 0;

    useEffect(() => {
        if (dailyWater.length > 0) {
            setIsLoading(false);
        }
    }, [dailyWater]);

    const displayDate = isToday(date) ? 'Today' : format(date, 'd, MMMM');

    const formattedEntries = dailyWater.map((item) => {
        const formattedTime = formatTime(item.time);
        return {
            ...item,
            formattedTime,
        };
    });

    const handleEdit = (id: string) => {
        setWater(dailyWater.find((item) => item.id === id));
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setWater(dailyWater.find((item) => item.id === id));
        setIsDeleteModalOpen(true);
    };

    return (
        <>
            <Box component="div" className={scss.wrapper}>
                <Box component="div" className={scss.topBox}>
                    <Typography component="h3" className={scss.h2}>
                        {displayDate}
                    </Typography>
                    <ButtonWater />
                </Box>
                {isLoading ? (
                    <BoxSkeleton />
                ) : (
                    <CustomScrollBar style={{ maxWidth: '100%', height: 'auto' }}>
                        {showList ? (
                            <Typography component="p" className={scss.text}>
                                {t('MonthInfo.noData')}
                            </Typography>
                        ) : (
                            <List className={scss.list}>
                                {formattedEntries.map((item) => (
                                    <ItemListDailyInfo
                                        key={item.id}
                                        dataItem={{
                                            time: item.formattedTime,
                                            volume: item.volume,
                                            id: item.id,
                                        }}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </List>
                        )}
                    </CustomScrollBar>
                )}
            </Box>

            {water && (
                <CustomModal
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title={t('Water.editTitle')}
                >
                    <AddWater water={water} onClose={() => setIsEditModalOpen(false)} />
                </CustomModal>
            )}

            {water && (
                <CustomModal
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    title={t('DeleteWater.title')}
                    centerTitle
                >
                    <DeleteWater water={water} onClose={() => setIsDeleteModalOpen(false)} />
                </CustomModal>
            )}
        </>
    );
};

export default BoxDailyInfo;
