import AppError from "../errors/appError";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";

class ListAllCarService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(
    page: number,
    limit: number,
    params?: object
  ): Promise<Object> {
    const skip = (page - 1) * limit;
    const car = await this.carRepository.listAll(skip, limit, params);

    if (!car || car.length === 0) {
      throw new AppError("Car not found", 404);
    }

    const totalCars = await this.carRepository.countDocuments(params);
    const totalPages = Math.ceil(totalCars / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      car,
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

export default ListAllCarService;
