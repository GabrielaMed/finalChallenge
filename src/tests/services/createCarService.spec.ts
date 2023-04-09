import ICarRepository from "../../repositories/ICarRepository";
import CarRepository from "../../repositories/carRepository";
import CreateCarService from "../../services/createCarService";

describe("Create car", () => {
  let carRepository: ICarRepository;
  let createCarService: CreateCarService;

  beforeAll(() => {
    carRepository = new CarRepository();
    createCarService = new CreateCarService(carRepository);
  });

  it("should be able to create a new car", async () => {
    const carData = {
      model: "teste",
      color: "red",
      year: "2020",
      value_per_day: 20,
      accessories: [{ description: "something" }],
      number_of_passengers: 5,
    };

    const car = await createCarService.execute(carData);

    expect(car).toHaveProperty("_id");
  });
});
