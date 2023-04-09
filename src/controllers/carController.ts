import { Request, Response } from "express";
import { createCarValidator } from "../validators/createCarValidator";
import CarRepository from "../repositories/carRepository";
import CreateCarService from "../services/createCarService";
import ListAllCarService from "../services/listAllCarService";
import DeleteCarService from "../services/deleteCarService";
import GetCarByIdService from "../services/getCarByIdService";
import UpdateCarService from "../services/updateCarService";
import { updateCarValidator } from "../validators/updateCarValidator";
import DeleteCarAccessoryByIdService from "../services/deleteCarAccessoryByIdService";
import UpdateCarAccessoryService from "../services/updateCarAccessoryService";

class CarController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = req.body;

    const validationResult = createCarValidator.safeParse({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json(errorFormatted);
    }

    const carRepository = new CarRepository();
    const createCar = new CreateCarService(carRepository);

    const car = await createCar.execute({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });

    return res.status(201).json({ message: "Car created successfully!", car });
  }
  async listAll(req: Request, res: Response): Promise<Response> {
    const { page, limit, ...params } = req.query;

    const carRepository = new CarRepository();
    const getCar = new ListAllCarService(carRepository);

    const query = {
      ...params,
    };

    let car;
    if (params) {
      car = await getCar.execute(Number(page), Number(limit), query);
    } else {
      car = await getCar.execute(Number(page), Number(limit));
    }

    return res.status(200).json(car);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const carRepository = new CarRepository();
    const deleteCar = new DeleteCarService(carRepository);

    await deleteCar.execute(id);

    return res.status(204).send();
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const carRepository = new CarRepository();
    const getCarById = new GetCarByIdService(carRepository);

    const car = await getCarById.execute(id);

    return res.status(200).json({ car });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { ...data } = req.body;

    if (data.accessories) {
      return res.status(400).json({
        message:
          "To update or delete an accesory use this route: localhost:3000/api/v1/car/:carId/accessories/:accessoryId",
      });
    }

    const carRepository = new CarRepository();
    const updateCar = new UpdateCarService(carRepository);

    const validationResult = updateCarValidator.safeParse({
      ...data,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json(errorFormatted);
    }

    const car = await updateCar.execute({ id, ...data });

    return res.status(200).json({ car });
  }

  async updateAccessory(req: Request, res: Response): Promise<Response> {
    const { carId, accessoryId } = req.params;
    const { description } = req.body;

    const carRepository = new CarRepository();
    const updateAccessory = new UpdateCarAccessoryService(carRepository);

    const car = await updateAccessory.execute(carId, accessoryId, description);

    if (car?.status === "delete") {
      return res.status(204).send();
    } else if (car.status === "put") {
      return res.status(200).json({ car });
    } else {
      return res.status(201).json({ car });
    }
  }

  async deleteAccessoryById(req: Request, res: Response): Promise<Response> {
    const { carId, accessoryId } = req.params;

    const carRepository = new CarRepository();
    const deleteAccessoryById = new DeleteCarAccessoryByIdService(
      carRepository
    );

    await deleteAccessoryById.execute(carId, accessoryId);

    return res.status(204).send();
  }
}

export default CarController;
