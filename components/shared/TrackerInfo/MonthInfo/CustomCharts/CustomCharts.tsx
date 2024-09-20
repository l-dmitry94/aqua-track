import { Box } from '@mui/material';
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

// Sample data for the graph
const data = [
    { name: 'Day 1', value: 400 },
    { name: 'Day 2', value: 300 },
    { name: 'Day 3', value: 500 },
    { name: 'Day 4', value: 200 },
    { name: 'Day 5', value: 278 },
    { name: 'Day 6', value: 189 },
];
const CuctomCharts = ({ currentMonth, onMonthChange, onToggleView }) => {
    console.log(`graph ${currentMonth}`);
    return (
        <Box component="div">
            <HeaderMonthInfo
                currentMonth={currentMonth}
                onMonthChange={onMonthChange}
                onToggleView={onToggleView}
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
