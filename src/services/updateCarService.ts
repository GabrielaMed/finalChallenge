import mongoose from "mongoose";
import AppError from "../errors/appError";
import { ICarAccessories } from "../interfaces/ICarAccessories";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";
import CarDTO from "../dtos/carDTO";

interface Request {
  id: string;
  model?: string;
  color?: string;
  year?: string;
  value_per_day?: number;
  accessories?: ICarAccessories;
  number_of_passengers?: number;
}

class UpdateCarService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(data: Request): Promise<CarDTO | null> {
    const {
      id,
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = data;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    let car = await this.carRepository.findById(id);

    if (!car) {
      throw new AppError("Car not found!", 404);
    }

    car = await this.carRepository.update(id, {
      ...data,
    });

    return car;
  }
}

export default UpdateCarService;
