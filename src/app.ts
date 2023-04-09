import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "dotenv/config";
import { databaseConnect } from "./config/database";
import AppError from "./errors/appError";
import "express-async-errors";
import routes from "./routes";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: "error", message: error.message });
    }
    return response
      .status(500)
      .json({ status: "error", message: "💥 Internal server error." });
  }
);

databaseConnect();
