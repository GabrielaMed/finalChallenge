import mongoose from "mongoose";
import AppError from "../errors/appError";
import IUserRepository from "../repositories/IUserRepository";
import UserRepository from "../repositories/userRepository";
import validate from "uuid-validate";
import UserDTO from "../dtos/userDTO";

class GetUserByIdService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<UserDTO> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    user.password = undefined;

    return user;
  }
}

export default GetUserByIdService;
