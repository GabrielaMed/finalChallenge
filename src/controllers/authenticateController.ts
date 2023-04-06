import { Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import AuthenticateServices from "../services/authenticateServices";
import { z } from "zod";

const authenticateSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" })
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must have at least 6 digits!" }),
});

class AuthenticateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const validationResult = authenticateSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json({ errorFormatted });
    }

    const userRespository = new UserRepository();
    const createSesison = new AuthenticateServices(userRespository);

    const token = await createSesison.execute({
      email,
      password,
    });

    return res.status(200).json(token);
  }
}

export default AuthenticateController;
