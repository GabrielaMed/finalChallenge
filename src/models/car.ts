import { Schema, model, Document } from "mongoose";
import { ICarAccessories } from "../interfaces/ICarAccessories";

interface ICar extends Document {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: ICarAccessories[];
  number_of_passengers: number;
}

const accessorySchema = new Schema<ICarAccessories>({
  description: {
    type: String,
    required: true,
    unique: true,
  },
});

const CarSchema = new Schema<ICar>(
  {
    model: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: String, required: true, min: 1950, max: 2023 },
    value_per_day: { type: Number, required: true },
    accessories: { type: [accessorySchema], required: true, min: 1 },
    number_of_passengers: { type: Number, required: true },
  },
  { versionKey: false }
);

export const CarModel = model<ICar>("Car", CarSchema);
