import * as z from "zod";

const accessorySchema = z.object({
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(3, { message: "Description must have at least 3 characters" }),
});

export const updateCarValidator = z
  .object({
    model: z
      .string({
        required_error: "Model is required",
        invalid_type_error: "Model must be a string",
      })
      .trim()
      .min(3, { message: "Model must have at least 3 characters" }),
    color: z
      .string({
        required_error: "Color is required",
        invalid_type_error: "Color must be a string",
      })
      .trim()
      .min(3, { message: "Model must be at least 3 characters long" }),
    year: z
      .string({
        required_error: "Year is required",
        invalid_type_error: "Year must be a string",
      })
      .trim()
      .refine((val) => parseInt(val) >= 1950 && parseInt(val) <= 2023, {
        message: "Year must be between 1950 and 2023",
      }),
    value_per_day: z
      .number({
        required_error: "Value per day is required",
        invalid_type_error: "Value per day must be a number",
      })
      .nonnegative({ message: "Value per day cannot be negative" }),
    accessories: z
      .array(accessorySchema)
      .min(1, { message: "Car must have at least one accessory" })
      .refine((e) => new Set(e).size === e.length, {
        message: "Accessory must have unique elements",
      }),
    number_of_passengers: z
      .number({
        required_error: "Number of passengers is required",
        invalid_type_error: "Number of passengers must be a number",
      })
      .int({ message: "Number of passengers must be an integer" })
      .nonnegative({ message: "Number of passengers can not be negative" }),
  })
  .partial()
  .strict();
