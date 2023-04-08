import { Schema, model, Document } from "mongoose";

interface IReserve extends Document {
  car_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  start_date: Date;
  end_date: Date;
  final_value: number;
}

const ReserveSchema = new Schema<IReserve>(
  {
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    final_value: { type: Number, required: true },
    car_id: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { versionKey: false }
);

export const ReserveModel = model<IReserve>("Reserve", ReserveSchema);
