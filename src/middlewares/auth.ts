import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/appError";

const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    verify(token, String(process.env.JWT_SECRET));

    next();
  } catch {
    throw new AppError("JWT token is invalid!", 401);
  }
};

export default authenticate;
