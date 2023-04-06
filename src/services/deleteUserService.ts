import mongoose from "mongoose";
import AppError from "../errors/appError";
import IUserRepository from "../repositories/IUserRepository";
import UserRepository from "../repositories/userRepository";
import validate from "uuid-validate";

class DeleteUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<void | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    await this.userRepository.delete(id);
  }
}

export default DeleteUserService;
