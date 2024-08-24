import mongoose, { Schema, Document } from 'mongoose';

interface IWaterEntry extends Document {
    user: mongoose.Types.ObjectId;
    date: Date;
    volume: number;
}

const waterSchema = new Schema<IWaterEntry>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        volume: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const WaterEntry = mongoose.models.WaterEntry || mongoose.model<IWaterEntry>('WaterEntry', waterSchema);

export default WaterEntry;
