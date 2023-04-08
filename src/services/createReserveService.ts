import mongoose, { Schema } from "mongoose";
import ReserveDTO from "../dtos/reserveDTO";
import AppError from "../errors/appError";
import IReserveRepository from "../repositories/IReserveRepository";
import ReserveRepository from "../repositories/reserveRepository";
import ICarRepository from "../repositories/ICarRepository";
import CarRepository from "../repositories/carRepository";
import IUserRepository from "../repositories/IUserRepository";
import UserRepository from "../repositories/userRepository";

interface Request {
  car_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  start_date: Date;
  end_date: Date;
}

class CreateReserveService {
  private reserveRepository: IReserveRepository;
  private carRepository: ICarRepository;
  private userRepository: IUserRepository;

  constructor(
    reserveRepository: ReserveRepository,
    carRepository: CarRepository,
    userRepository: UserRepository
  ) {
    this.reserveRepository = reserveRepository;
    this.carRepository = carRepository;
    this.userRepository = userRepository;
  }

  public async execute(data: Request): Promise<ReserveDTO> {
    const { car_id, start_date, end_date, user_id } = data;

    const car = await this.carRepository.findById(String(car_id));

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    const carReserved = await this.reserveRepository.findByCarIdAndDates(
      String(car_id),
      start_date,
      end_date
    );

    if (carReserved) {
      throw new AppError(
        "This car is already reserved on the dates selected",
        400
      );
    }

    const user = await this.userRepository.findById(String(user_id));

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.qualified === "no") {
      throw new AppError("User not qualified", 400);
    }

    const userAlreadyReserved =
      await this.reserveRepository.findByUserIdAndDates(
        String(user_id),
        start_date,
        end_date
      );

    if (userAlreadyReserved) {
      throw new AppError(
        "You can not reserve more then one car at the same time",
        400
      );
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    const oneDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / oneDay);

    const final_value = totalDays * car.value_per_day;

    const reserve = await this.reserveRepository.create({
      car_id,
      user_id,
      start_date,
      end_date,
      final_value,
    });

    return reserve;
  }
}

export default CreateReserveService;
