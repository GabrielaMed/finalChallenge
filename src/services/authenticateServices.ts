import { compare } from "bcrypt";
import AppError from "../errors/appError";
import IUserRepository from "../repositories/IUserRepository";
import { sign } from "jsonwebtoken";
import UserDTO from "../dtos/userDTO";

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: UserDTO;
}

class AuthenticateServices {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password is not correct!", 401);
    }

    const passwordVerify = await compare(password, user.password!);

    if (!passwordVerify) {
      throw new AppError("Password is not correct!", 401);
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    return {
      token,
      user,
    };
  }
}

export default AuthenticateServices;
