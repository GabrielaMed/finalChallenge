import { Schema } from "mongoose";

export default interface ReserveDTO {
  [x: string]: any;
  start_date: Date;
  end_date: Date;
  final_value: number;
  user_id: Schema.Types.ObjectId;
  car_id: Schema.Types.ObjectId;
}
