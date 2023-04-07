import mongoose from "mongoose";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";
import AppError from "../errors/appError";
import CarDTO from "../dtos/carDTO";

interface Response {
  car: CarDTO | null;
  status: "put" | "delete" | "post";
}

class UpdateCarAccessoryService {
  private carRepository: ICarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public async execute(
    carId: string,
    accessoryId: string,
    description: string
  ): Promise<Response> {
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      throw new AppError("Car id is different from default!", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(accessoryId)) {
      throw new AppError("Accessory id is different from default!", 400);
    }
    let car;

    car = await this.carRepository.findAccessoryByDescription(
      carId,
      description
    );

    if (car?.accessories) {
      await this.carRepository.deleteAccessoryById(carId, accessoryId);
      return { status: "delete", car };
    }

    car = await this.carRepository.findAccessoryById(carId, accessoryId);

    if (car?.accessories) {
      car = await this.carRepository.updateAccessory(
        carId,
        accessoryId,
        description
      );

      return { status: "put", car };
    }

    car = await this.carRepository.createAccessory(carId, description);

    return { status: "post", car };
  }
}

export default UpdateCarAccessoryService;
