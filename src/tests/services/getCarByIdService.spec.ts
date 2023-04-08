import mongoose from "mongoose";
import ICarRepository from "../../repositories/ICarRepository";
import CreateCarService from "../../services/createCarService";
import CarRepository from "../../repositories/carRepository";
import { ICarAccessories } from "../../interfaces/ICarAccessories";
import AppError from "../../errors/appError";
import GetCarByIdService from "../../services/getCarByIdService";

interface Response {
  _id?: mongoose.Types.ObjectId;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: ICarAccessories[];
  number_of_passengers: number;
}

describe("Get car by id", () => {
  let carRepository: ICarRepository;
  let getCarByIdService: GetCarByIdService;
  let createCarService: CreateCarService;
  let car: Response;

  beforeAll(async () => {
    carRepository = new CarRepository();
    getCarByIdService = new GetCarByIdService(carRepository);
    createCarService = new CreateCarService(carRepository);

    const carData = {
      model: "teste 2",
      color: "white",
      year: "2020",
      value_per_day: 20,
      accessories: [{ description: "something" }],
      number_of_passengers: 5,
    };

    car = await createCarService.execute(carData);
  });

  it("should be able to get a car by id", async () => {
    const id = car._id;

    const carExists = await getCarByIdService.execute(String(id));

    expect(carExists).toHaveProperty("_id");
  });

  it("should not be able to get a car with invalid id", async () => {
    const id = "invalid";

    await expect(getCarByIdService.execute(id)).rejects.toEqual(
      new AppError("Id is different from default!", 400)
    );
  });

  it("should not be able to get an unexisting car", async () => {
    const id = "6167fcf8e5fbb540a2c59f68";

    await expect(getCarByIdService.execute(id)).rejects.toEqual(
      new AppError("Car not found!", 404)
    );
  });
});
