export interface DailyInfoTypes {
    _id: string;
    user: string;
    date: string;
    volume: number;
    createdAt: string;
    updatedAt: string;
}

export interface DailyInfoResponse {
    currentDate: string;
    entries: DailyInfoTypes[];
}
