import mongoose from "mongoose";
import AppError from "../errors/appError";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";
import CarDTO from "../dtos/carDTO";

class GetCarByIdService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(id: string): Promise<CarDTO> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    const car = await this.carRepository.findById(id);

    if (!car) {
      throw new AppError("User not found!", 404);
    }

    return car;
  }
}

export default GetCarByIdService;
