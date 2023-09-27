import mongoose from 'mongoose';

export type SampleType = { _id: string; date: string; passengers: number; carriages: CarrigeType[] };
export type CarrigeType = { capacity: number; occupancy: number; passengers: number };

const SampleSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  passengers: { type: Number, required: true },
  carriages: { type: Array, required: true, seatingArray: Array },
});

export default mongoose?.models?.Sample || mongoose.model('Sample', SampleSchema);
