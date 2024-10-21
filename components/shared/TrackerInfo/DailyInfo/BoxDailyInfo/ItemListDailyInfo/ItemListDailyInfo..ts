export interface ItemListDailyInfoProps {
    dataItem: {
        time?: string;
        volume?: number;
        message?: string;
        id?: string;
    };
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}
