import CarDTO from "../../dtos/carDTO";
import ReserveDTO from "../../dtos/reserveDTO";
import UserDTO from "../../dtos/userDTO";
import { UserQualified } from "../../enums/userQualified";
import AppError from "../../errors/appError";
import ICarRepository from "../../repositories/ICarRepository";
import IReserveRepository from "../../repositories/IReserveRepository";
import IUserRepository from "../../repositories/IUserRepository";
import CarRepository from "../../repositories/carRepository";
import ReserveRepository from "../../repositories/reserveRepository";
import UserRepository from "../../repositories/userRepository";
import CreateCarService from "../../services/createCarService";
import CreateReserveService from "../../services/createReserveService";
import CreateUserService from "../../services/createUserService";
import ListAllReserveService from "../../services/listAllReserveService";

describe("List all reserves", () => {
  let reserveRepository: IReserveRepository;
  let userRepository: IUserRepository;
  let carRepository: ICarRepository;
  let createUserService: CreateUserService;
  let listAllReserveService: ListAllReserveService;
  let createReserveService: CreateReserveService;
  let createCarService: CreateCarService;
  let user: UserDTO;
  let car: CarDTO;
  let reserve: ReserveDTO;
  let car_id: any;
  let user_id: any;
  let reserve_id: any;

  beforeAll(async () => {
    reserveRepository = new ReserveRepository();
    userRepository = new UserRepository();
    carRepository = new CarRepository();
    listAllReserveService = new ListAllReserveService(reserveRepository);
    createReserveService = new CreateReserveService(
      reserveRepository,
      carRepository,
      userRepository
    );
    createUserService = new CreateUserService(userRepository);
    createCarService = new CreateCarService(carRepository);

    const userData = {
      name: "Test Name",
      cpf: "123.456.789-01",
      birth: new Date("2000-05-05"),
      email: "test@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    user = await createUserService.execute(userData);

    const carData = {
      model: "teste",
      color: "red",
      year: "2020",
      value_per_day: 20,
      accessories: [{ description: "something" }],
      number_of_passengers: 5,
    };

    car = await createCarService.execute(carData);

    car_id = car._id;
    user_id = user._id;

    const reserveData = {
      car_id,
      user_id,
      start_date: new Date("2020-01-01"),
      end_date: new Date("2020-02-01"),
    };

    reserve = await createReserveService.execute(reserveData);
    reserve_id = reserve._id;
  });

  it("should be able to list all reserves", async () => {
    const limit = 2;
    const page = 1;
    const reserves = Object.keys(
      await listAllReserveService.execute(page, limit)
    );

    expect(reserves.length).toBeGreaterThan(0);
  });

  it("should be able to list all reserve using any other param", async () => {
    const limit = 2;
    const page = 1;
    const params = {
      user_id,
    };

    let reserves = Object.keys(
      await listAllReserveService.execute(page, limit, params)
    );

    expect(reserves.length).toBeGreaterThan(0);
  });

  it("should not be able to return something if reserve is not found", async () => {
    const limit = 2;
    const page = 1;
    const car_id = "6432d55f6681bde406c6ef8a";

    await expect(
      listAllReserveService.execute(page, limit, { car_id })
    ).rejects.toEqual(new AppError("Reserve not found", 404));
  });

  it("should be able to list reserves sending limit and page equal to 0", async () => {
    const limit = 0;
    const page = 0;
    const reserves = Object.keys(
      await listAllReserveService.execute(page, limit)
    );

    expect(reserves.length).toBeGreaterThan(0);
  });
});
