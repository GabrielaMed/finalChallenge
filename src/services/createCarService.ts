import CarDTO from "../dtos/carDTO";
import AppError from "../errors/appError";
import { ICarAccessories } from "../interfaces/ICarAccessories";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";

interface Request {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: ICarAccessories[];
  number_of_passengers: number;
}

class CreateCarService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(data: Request): Promise<CarDTO> {
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = data;

    const car = await this.carRepository.create({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });

    return car;
  }
}

export default CreateCarService;
