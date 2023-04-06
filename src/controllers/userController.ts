import { Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import CreateUserService from "../services/createUserService";
import { z } from "zod";

const userSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(3, "Name must have at least 3 characters"),
  cpf: z
    .string({
      required_error: "CPF is required",
      invalid_type_error: "CPF must be a string",
    })
    .trim()
    .min(11, "CPF must have 11 characters.")
    .max(14, "CPF must have 14 characters."),
  birth: z.coerce.date({
    required_error: "Birth is required",
    invalid_type_error: "Birth must be a Date",
  }),
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
  cep: z
    .string({
      required_error: "CEP is required",
      invalid_type_error: "CEP must be a string",
    })
    .trim()
    .min(9, { message: "CEP must have 9 characters. EX: 00000-000" })
    .max(9, { message: "CEP must have 9 characters. EX: 00000-000" })
    .regex(/^(?!.*(\d)(?:-|\1))*\d{5}-\d{3}$/, {
      message: "CEP must have numbers and - EX: 00000-000",
    }),
  qualified: z.enum(["yes", "no"]),
});

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cpf, birth, email, password, cep, qualified } = req.body;

    const validationResult = userSchema.safeParse({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json({ errorFormatted });
    }

    const userRepository = new UserRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });
    return res
      .status(201)
      .json({ message: "User created successfully!", user });
  }
}

export default UserController;
