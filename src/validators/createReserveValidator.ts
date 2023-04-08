import { Types } from "mongoose";
import * as z from "zod";

export const createReserveValidator = z
  .object({
    start_date: z.coerce.date({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a date",
    }),
    end_date: z.coerce.date({
      required_error: "End date is required",
      invalid_type_error: "End date must be a date",
    }),
    car_id: z
      .string({
        required_error: "Car id is required",
        invalid_type_error: "Car id must be a string",
      })
      .refine((value) => {
        return Types.ObjectId.isValid(value);
      }, "Invalid ObjectId"),
    user_id: z
      .string({
        required_error: "Car id is required",
        invalid_type_error: "Car id must be a string",
      })
      .refine((value) => {
        return Types.ObjectId.isValid(value);
      }, "Invalid ObjectId"),
  })
  .strict();
