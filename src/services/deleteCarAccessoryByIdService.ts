import mongoose from "mongoose";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";
import AppError from "../errors/appError";

class DeleteCarAccessoryService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(
    carId: string,
    accessoryId: string
  ): Promise<void | null> {
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new AppError("Car id is different from default!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(accessoryId)) {
      throw new AppError("Accessory id is different from default!", 400);
    }

    const car = await this.carRepository.deleteAccessoryById(
      carId,
      accessoryId
    );

    if (!car) {
      throw new AppError("Car not found!", 404);
    }
  }
}

export default DeleteCarAccessoryService;
