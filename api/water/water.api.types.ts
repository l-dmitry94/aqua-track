export type WaterBody = {
    id: string;
    date?: string;
    time: string;
    volume: number;
};

export type WaterResponse = {
    id: string;
    userId: string;
    date: string;
    time: string;
    volume: number;
};
