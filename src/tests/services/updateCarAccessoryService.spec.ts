import mongoose from "mongoose";
import ICarRepository from "../../repositories/ICarRepository";
import CreateCarService from "../../services/createCarService";
import CarRepository from "../../repositories/carRepository";
import { ICarAccessories } from "../../interfaces/ICarAccessories";
import AppError from "../../errors/appError";
import UpdateCarAccessoryService from "../../services/updateCarAccessoryService";

interface Response {
  _id?: mongoose.Types.ObjectId;
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: ICarAccessories[];
  number_of_passengers: number;
}

describe("Update car accessory", () => {
  let carRepository: ICarRepository;
  let updateCarAcessoryService: UpdateCarAccessoryService;
  let createCarService: CreateCarService;
  let car: Response;

  beforeAll(async () => {
    carRepository = new CarRepository();
    updateCarAcessoryService = new UpdateCarAccessoryService(carRepository);
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

  it("should not be able to update a car accesory with invalid carId", async () => {
    const carId = "invalid";
    const accessoryId = "invalid";
    const description = "something";

    await expect(
      updateCarAcessoryService.execute(carId, accessoryId, description)
    ).rejects.toEqual(new AppError("Car id is different from default!", 400));
  });

  it("should not be able to update a car accesory with invalid accessoryId", async () => {
    const carId = "6431b3c8563d23a6c79996e1";
    const accessoryId = "invalid";
    const description = "something";

    await expect(
      updateCarAcessoryService.execute(carId, accessoryId, description)
    ).rejects.toEqual(
      new AppError("Accessory id is different from default!", 400)
    );
  });

  it("should be able to delete an accessory if it exists", async () => {
    const carId = car._id;
    const accessoryId = "6431b3c8563d23a6c79996e1";
    const description = "something";

    const accessoryExists = await updateCarAcessoryService.execute(
      String(carId),
      accessoryId,
      description
    );

    expect(accessoryExists.status).toBe("delete");
  });

  it("should be able to update an accessory if description is different", async () => {
    const carId = car._id;
    const accessoryId = car.accessories
      .map((accessory) => accessory._id)
      .toString();
    const description = "something else";

    const accessoryExists = await updateCarAcessoryService.execute(
      String(carId),
      accessoryId,
      description
    );

    expect(accessoryExists.status).toBe("put");
  });

  it("should be able to create an accessory if accessory id not found", async () => {
    const carId = car._id;
    const accessoryId = "64308d5de0d0fd906213ec3c";
    const description = "something different";

    const accessoryExists = await updateCarAcessoryService.execute(
      String(carId),
      accessoryId,
      description
    );

    expect(accessoryExists.status).toBe("post");
  });
});
