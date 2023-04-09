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
  id: string;
  car_id?: Schema.Types.ObjectId;
  user_id?: Schema.Types.ObjectId;
  start_date?: Date;
  end_date?: Date;
}

class UpdateReserveService {
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

  public async execute(data: Request): Promise<ReserveDTO | null> {
    const { car_id, start_date, end_date, user_id, id } = data;
    let car;

    let reserve = await this.reserveRepository.findById(id);

    if (!reserve) {
      throw new AppError("Reserve not found!", 404);
    }

    if (car_id) {
      car = await this.carRepository.findById(String(car_id));

      if (!car) {
        throw new AppError("Car not found", 404);
      }
    }

    if (start_date && end_date && car_id) {
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
    }

    if (user_id) {
      const user = await this.userRepository.findById(String(user_id));

      if (!user) {
        throw new AppError("User not found", 404);
      }

      if (user.qualified === "no") {
        throw new AppError("User not qualified", 400);
      }
    }

    if (start_date && end_date && user_id) {
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
    }

    car = await this.carRepository.findById(String(reserve.car_id));

    if (!car) {
      throw new AppError("Car not found!", 404);
    }

    const start = new Date(start_date ? start_date : reserve?.start_date);
    const end = new Date(end_date ? end_date : reserve?.end_date);

    const oneDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / oneDay);

    const final_value = totalDays * car.value_per_day;

    reserve = await this.reserveRepository.update(id, {
      ...data,
      final_value,
    });

    return reserve;
  }
}

export default UpdateReserveService;
