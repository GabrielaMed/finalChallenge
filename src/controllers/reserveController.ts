import { Request, Response } from "express";
import { createReserveValidator } from "../validators/createReserveValidator";
import ReserveRepository from "../repositories/reserveRepository";
import CreateReserveService from "../services/createReserveService";
import CarRepository from "../repositories/carRepository";
import UserRepository from "../repositories/userRepository";
import ListAllReserveService from "../services/listAllReserveService";
import GetReserveByIdService from "../services/getReserveByIdService";
import DeleteReserveService from "../services/deleteReserveService";
import UpdateReserveService from "../services/updateReserveService";
import { updateReserveValidator } from "../validators/updateReserveValidator";

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
      .json({ message: "Reserve created successfully!", reserve });
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    const { page, limit, ...params } = req.query;

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

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const reserveRepository = new ReserveRepository();
    const getReserveById = new GetReserveByIdService(reserveRepository);

    const reserve = await getReserveById.execute(id);

    return res.status(200).json({ reserve });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const reserveRepository = new ReserveRepository();
    const deleteReserve = new DeleteReserveService(reserveRepository);

    await deleteReserve.execute(id);

    return res.status(204).send();
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { ...data } = req.body;

    const reserveRepository = new ReserveRepository();
    const carRepository = new CarRepository();
    const userRepository = new UserRepository();
    const updateReserve = new UpdateReserveService(
      reserveRepository,
      carRepository,
      userRepository
    );

    const validationResult = updateReserveValidator.safeParse({
      ...data,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json(errorFormatted);
    }

    const reserve = await updateReserve.execute({ id, ...data });

    if (!reserve) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    return res.status(200).json({ reserve });
  }
}

export default ReserveController;
