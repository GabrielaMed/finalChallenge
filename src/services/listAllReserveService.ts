import AppError from "../errors/appError";
import IReserveRepository from "../repositories/IReserveRepository";
import ReserveRepository from "../repositories/reserveRepository";

class ListAllReserveService {
  private reserveRepository: IReserveRepository;

  constructor(reserveRepository: ReserveRepository) {
    this.reserveRepository = reserveRepository;
  }

  public async execute(
    page: number,
    limit: number,
    params?: object
  ): Promise<Object> {
    page = page || 1;
    limit = limit || 10;
    const skip = (page - 1) * limit;
    const reserve = await this.reserveRepository.listAll(skip, limit, params);

    if (!reserve || reserve.length === 0) {
      throw new AppError("Reserve not found", 404);
    }

    const totalUsers = await this.reserveRepository.countDocuments(params);
    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      reserve,
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

export default ListAllReserveService;
