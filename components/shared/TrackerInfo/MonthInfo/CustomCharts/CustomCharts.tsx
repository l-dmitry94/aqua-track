import React from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import HeaderMonthInfo from '../HeaderMonthInfo/HeaderMonthInfo';

import { CustomChartsProps } from './CustomCharts.types';

// Sample data for the graph
const data = [
    { name: 'Day 1', value: 400 },
    { name: 'Day 2', value: 300 },
    { name: 'Day 3', value: 500 },
    { name: 'Day 4', value: 200 },
    { name: 'Day 5', value: 278 },
    { name: 'Day 6', value: 189 },
];
const CuctomCharts: React.FC<CustomChartsProps> = ({
    currentMonth,
    onMonthChange,
    ontoggleView,
}) => {
    console.log(`graph ${currentMonth}`);
    return (
        <Box component="div">
            <HeaderMonthInfo
                currentMonth={currentMonth}
                onMonthChange={onMonthChange}
                onToggleView={ontoggleView}
                views={[]}
                view={'year'}
                reduceAnimations={false}
                minDate={dayjs()}
                maxDate={dayjs()}
                timezone={''}
            />
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};
export default CuctomCharts;
