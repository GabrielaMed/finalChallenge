import mongoose from "mongoose";
import AppError from "../errors/appError";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";

class DeleteCarService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(id: string): Promise<void | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    const car = await this.carRepository.findById(id);

    if (!car) {
      throw new AppError("Car not found!", 404);
    }

    await this.carRepository.delete(id);
  }
}

export default DeleteCarService;
