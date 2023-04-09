import ICarRepository from "../../repositories/ICarRepository";
import CreateCarService from "../../services/createCarService";
import CarRepository from "../../repositories/carRepository";
import { ICarAccessories } from "../../interfaces/ICarAccessories";
import AppError from "../../errors/appError";
import UpdateCarService from "../../services/updateCarService";

interface Response {
  id: string;
  model?: string;
  color?: string;
  year?: string;
  value_per_day?: number;
  accessories?: ICarAccessories;
  number_of_passengers?: number;
}

describe("Update car", () => {
  let carRepository: ICarRepository;
  let updateCarService: UpdateCarService;
  let createCarService: CreateCarService;

  beforeAll(async () => {
    carRepository = new CarRepository();
    updateCarService = new UpdateCarService(carRepository);
    createCarService = new CreateCarService(carRepository);
  });

  it("should be able to update a car", async () => {
    const carData = {
      model: "teste 2",
      color: "white",
      year: "2020",
      value_per_day: 20,
      accessories: [{ description: "something" }],
      number_of_passengers: 5,
    };

    const car = await createCarService.execute(carData);

    const carDataUpdate: Response = {
      id: String(car._id),
      year: "2023",
    };

    const updateCar = await updateCarService.execute(carDataUpdate);

    expect(updateCar).toHaveProperty("_id");
  });

  it("should not be able to delete a car with invalid id", async () => {
    const id = "invalid";

    await expect(updateCarService.execute({ id })).rejects.toEqual(
      new AppError("Id is different from default!", 400)
    );
  });

  it("should not be able to delete an unexisting car", async () => {
    const id = "6167fcf8e5fbb540a2c59f68";

    await expect(updateCarService.execute({ id })).rejects.toEqual(
      new AppError("Car not found!", 404)
    );
  });
});
