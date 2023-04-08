import { Request, Response } from "express";
import { createReserveValidator } from "../validators/createReserveValidator";
import ReserveRepository from "../repositories/reserveRepository";
import CreateReserveService from "../services/createReserveService";
import CarRepository from "../repositories/carRepository";
import UserRepository from "../repositories/userRepository";

class ReserveController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { start_date, end_date, car_id, user_id } = req.body;

    const validationResult = createReserveValidator.safeParse({
      start_date,
      end_date,
      car_id,
      user_id,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json(errorFormatted);
    }

    const reserveRepository = new ReserveRepository();
    const carRepository = new CarRepository();
    const userRepository = new UserRepository();
    const createReserve = new CreateReserveService(
      reserveRepository,
      carRepository,
      userRepository
    );

    const reserve = await createReserve.execute({
      start_date,
      end_date,
      car_id,
      user_id,
    });

    return res
      .status(201)
      .json({ message: "User created successfully!", reserve });
  }
}

export default ReserveController;
