import { Request, Response } from "express";
import { createReserveValidator } from "../validators/createReserveValidator";
import ReserveRepository from "../repositories/reserveRepository";
import CreateReserveService from "../services/createReserveService";
import CarRepository from "../repositories/carRepository";
import UserRepository from "../repositories/userRepository";
import ListAllReserveService from "../services/listAllReserveService";

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

  async listAll(req: Request, res: Response): Promise<Response> {
    const { page = "1", limit = "10", ...params } = req.query;

    const reserveRepository = new ReserveRepository();
    const getReserve = new ListAllReserveService(reserveRepository);

    const query = {
      ...params,
    };

    let reserve;
    if (params) {
      reserve = await getReserve.execute(Number(page), Number(limit), query);
    } else {
      reserve = await getReserve.execute(Number(page), Number(limit));
    }

    return res.status(200).json(reserve);
  }
}

export default ReserveController;
