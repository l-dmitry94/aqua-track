import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import formattedDataForChart from '@/helpers/formattedDataForCharts';
import { useWaterStore } from '@/zustand/water/store';

import HeaderMonthInfo from '../HeaderMonthInfo/HeaderMonthInfo';

import CustomChartSkeleton from './CustomChartsSkeleton/CustomChartsSkeleton';
import { CustomChartsProps } from './CustomCharts.types';
import CustomTooltip from './CustomTooltip';

import scss from './CustomCharts.module.scss';

const CuctomCharts: React.FC<CustomChartsProps> = ({ onMonthChange, ontoggleView }) => {
    const { currentDate, fetchWeeklyWater, weeklyWater, dailyWater, currentMonthState, isLoading } =
        useWaterStore();

    useEffect(() => {
        fetchWeeklyWater(currentDate);
    }, [currentDate, fetchWeeklyWater, dailyWater]);

    const chartData = formattedDataForChart(weeklyWater, currentDate);
    console.log(chartData);

    return (
        <Box component="div" className={scss.charts}>
            <HeaderMonthInfo
                currentMonth={dayjs(currentMonthState)}
                onToggleView={ontoggleView}
                onMonthChange={onMonthChange}
                views={[]}
                view={'year'}
                reduceAnimations={false}
                minDate={dayjs()}
                maxDate={dayjs()}
                timezone={''}
            />
            {isLoading ? (
                <CustomChartSkeleton />
            ) : (
                <>
                    {weeklyWater.length === 0 && (
                        <Typography component="p" className={scss.text}>
                            No water entries yet
                        </Typography>
                    )}
                    <ResponsiveContainer width={'100%'} className={scss.chart}>
                        <AreaChart data={chartData} margin={{ top: 12, right: 12 }}>
                            <defs>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9BE1A0" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#9BE1A0" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                type="number"
                                tickCount={7}
                                domain={[chartData[1]?.name - 1, chartData[7]?.name + 1]}
                                dataKey="name"
                                tickSize={0}
                                tickMargin={17}
                                tick={{ fontSize: 15, color: '#323f47' }}
                                axisLine={false}
                                minTickGap={12}
                                allowDataOverflow
                                ticks={chartData.slice(0, -1).map((item) => item.name)}
                            />
                            <YAxis
                                type="number"
                                tickCount={6}
                                dataKey="pv"
                                domain={[0, 'dataMax']}
                                minTickGap={17}
                                tickSize={0}
                                tickFormatter={(v) => (v === 0 ? '0%' : `${v / 1000} L`)}
                                tick={{ fontSize: 14, color: '#323f47' }}
                                tickMargin={17}
                                axisLine={false}
                            />
                            <Tooltip
                                formatter={(value) => [value]}
                                labelFormatter={() => ''}
                                content={<CustomTooltip />}
                                cursor={true}
                                isAnimationActive={true}
                            />
                            <Area
                                type="linear"
                                dataKey="pv"
                                stroke="#87d28d"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorPv)"
                                dot={{ stroke: '#87d28d', strokeWidth: 3, r: 10, fill: '#ffffff' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </>
            )}
        </Box>
    );
};

export default CuctomCharts;
