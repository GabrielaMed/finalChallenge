import { Schema } from "mongoose";

export default interface ReserveDTO {
  start_date: Date;
  end_date: Date;
  final_value: number;
  user_id: Schema.Types.ObjectId;
  car_id: Schema.Types.ObjectId;
}
