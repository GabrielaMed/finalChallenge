import AppError from "../../errors/appError";
import ICarRepository from "../../repositories/ICarRepository";
import CarRepository from "../../repositories/carRepository";
import CreateCarService from "../../services/createCarService";
import ListAllCarService from "../../services/listAllCarService";

describe("List all cars", () => {
  let carRepository: ICarRepository;
  let listAllCarService: ListAllCarService;
  let createCarService: CreateCarService;
  let car;

  beforeAll(async () => {
    carRepository = new CarRepository();
    listAllCarService = new ListAllCarService(carRepository);
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

  it("should be able to list all cars", async () => {
    const limit = 2;
    const page = 1;
    let cars = [await listAllCarService.execute(page, limit)];

    expect(cars.length).toBeGreaterThan(0);
  });

  it("should be able to list all cars using any other param", async () => {
    const limit = 2;
    const page = 1;
    const params = {
      year: "2020",
      value_per_day: 20,
      accessories: "something",
    };

    let cars = [await listAllCarService.execute(page, limit, params)];

    expect(cars.length).toBeGreaterThan(0);
  });

  it("should not be able to return something if car is not found", async () => {
    const limit = 2;
    const page = 1;
    const model = "Unexisting model";

    await expect(
      listAllCarService.execute(page, limit, { model })
    ).rejects.toEqual(new AppError("Car not found", 404));
  });
});
