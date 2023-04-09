import AppError from "../errors/appError";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";

interface Request {
  model?: string;
  color?: string;
  year?: string;
  value_per_day?: number;
  accessories?: string;
  number_of_passengers?: number;
}

class ListAllCarService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(
    page: number,
    limit: number,
    params?: Request
  ): Promise<Object | void> {
    page = page || 1;
    limit = limit || 10;
    const skip = (page - 1) * limit;
    let car;

    if (params && params.accessories) {
      const description = params.accessories;

      delete params.accessories;

      car = await this.carRepository.listAll(skip, limit, params, description);
    } else {
      car = await this.carRepository.listAll(skip, limit, params);
    }

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
