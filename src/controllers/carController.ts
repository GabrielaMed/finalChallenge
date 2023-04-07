import { Request, Response } from "express";
import { createCarValidator } from "../validators/createCarValidator";
import CarRepository from "../repositories/carRepository";
import CreateCarService from "../services/createCarService";

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
}

export default CarController;
