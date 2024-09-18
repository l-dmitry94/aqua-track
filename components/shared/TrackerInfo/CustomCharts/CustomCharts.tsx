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

// Sample data for the graph
const data = [
    { name: 'Day 1', value: 400 },
    { name: 'Day 2', value: 300 },
    { name: 'Day 3', value: 500 },
    { name: 'Day 4', value: 200 },
    { name: 'Day 5', value: 278 },
    { name: 'Day 6', value: 189 },
];
const CuctomCharts = () => {
    return (
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
    );
};
export default CuctomCharts;
