import mongoose from "mongoose";

export function databaseConnect() {
  mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => console.log("👍 DB connected!"))
    .catch((error) => {
      console.log("Error connecting to database:", error);
    });
}
