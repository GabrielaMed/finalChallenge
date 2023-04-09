import AppError from "../errors/appError";
import IUserRepository from "../repositories/IUserRepository";
import UserRepository from "../repositories/userRepository";

class ListAllUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    page: number,
    limit: number,
    params?: object
  ): Promise<Object> {
    page = page || 1;
    limit = limit || 10;
    const skip = (page - 1) * limit;
    const user = await this.userRepository.listAll(skip, limit, params);

    if (!user || user.length === 0) {
      throw new AppError("User not found", 404);
    }

    const totalUsers = await this.userRepository.countDocuments(params);
    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      user,
      total: totalPages,
      limit: limit,
      offset: skip,
      offsets: {
        previous: hasPreviousPage ? skip - limit : null,
        next: hasNextPage ? skip + limit : null,
      },
    };
  }
}

export default ListAllUserService;
