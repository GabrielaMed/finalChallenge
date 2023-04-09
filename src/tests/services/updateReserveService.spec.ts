import CarDTO from "../../dtos/carDTO";
import UserDTO from "../../dtos/userDTO";
import { UserQualified } from "../../enums/userQualified";
import ICarRepository from "../../repositories/ICarRepository";
import IReserveRepository from "../../repositories/IReserveRepository";
import IUserRepository from "../../repositories/IUserRepository";
import CarRepository from "../../repositories/carRepository";
import ReserveRepository from "../../repositories/reserveRepository";
import UserRepository from "../../repositories/userRepository";
import CreateCarService from "../../services/createCarService";
import CreateReserveService from "../../services/createReserveService";
import CreateUserService from "../../services/createUserService";
import AppError from "../../errors/appError";
import ReserveDTO from "../../dtos/reserveDTO";
import UpdateReserveService from "../../services/updateReserveService";

describe("Update reserve", () => {
  let reserveRepository: IReserveRepository;
  let userRepository: IUserRepository;
  let carRepository: ICarRepository;
  let createUserService: CreateUserService;
  let createReserveService: CreateReserveService;
  let updateReserveService: UpdateReserveService;
  let createCarService: CreateCarService;
  let user: UserDTO;
  let userNotQualified: UserDTO;
  let car: CarDTO;
  let car2: CarDTO;
  let reserve: ReserveDTO;
  let car_id: any;
  let user_id: any;
  let reserve_id: any;
  let car3: CarDTO;

  beforeAll(async () => {
    reserveRepository = new ReserveRepository();
    userRepository = new UserRepository();
    carRepository = new CarRepository();
    updateReserveService = new UpdateReserveService(
      reserveRepository,
      carRepository,
      userRepository
    );
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

    const userData2 = {
      name: "Test Name 3",
      cpf: "581.459.820-49",
      birth: new Date("1990-09-10"),
      email: "test3@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    const user2 = await createUserService.execute(userData2);

    const userData3 = {
      name: "Test Name 2",
      cpf: "887.845.800-70",
      birth: new Date("2000-05-05"),
      email: "test2@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.no,
    };

    userNotQualified = await createUserService.execute(userData3);

    const carData = {
      model: "teste",
      color: "red",
      year: "2020",
      value_per_day: 20,
      accessories: [{ description: "something" }],
      number_of_passengers: 5,
    };

    car = await createCarService.execute(carData);

    const carData2 = {
      model: "teste2",
      color: "white",
      year: "2023",
      value_per_day: 90,
      accessories: [{ description: "something else" }],
      number_of_passengers: 7,
    };

    car2 = await createCarService.execute(carData2);

    const carData3 = {
      model: "teste3",
      color: "black",
      year: "2015",
      value_per_day: 50,
      accessories: [{ description: "something different" }],
      number_of_passengers: 5,
    };

    car3 = await createCarService.execute(carData3);

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

    const reserveData2 = {
      car_id: car2._id,
      user_id: user2._id,
      start_date: new Date("2020-01-01"),
      end_date: new Date("2020-02-01"),
    };

    await createReserveService.execute(reserveData2);
  });

  it("should be able to update a reserve", async () => {
    const reserveData = {
      id: reserve_id,
      car_id,
      user_id,
      start_date: new Date("2020-01-20"),
    };

    const reserve = await updateReserveService.execute(reserveData);

    expect(reserve).toHaveProperty("_id");
  });

  it("should not be able to update reserve if reserve not found", async () => {
    const reserveData = {
      id: "64330cc0494ae4eb2301e322",
      car_id,
      user_id,
      start_date: new Date("2020-01-20"),
    };

    await expect(updateReserveService.execute(reserveData)).rejects.toEqual(
      new AppError("Reserve not found!", 404)
    );
  });

  it("should not be able to update reserve if car not found", async () => {
    car_id = "6432d55f6681bde406c6ef8a";

    const reserveData = {
      id: reserve_id,
      car_id,
      user_id,
      end_date: new Date("2020-02-09"),
    };

    await expect(updateReserveService.execute(reserveData)).rejects.toEqual(
      new AppError("Car not found", 404)
    );
  });

  it("should not be able to update reserve if car already reserved", async () => {
    const car_id = car._id;
    const user_id = user._id;

    const reserveData = {
      id: reserve_id,
      car_id,
      user_id,
      start_date: new Date("2020-01-01"),
      end_date: new Date("2020-02-01"),
    };

    await expect(updateReserveService.execute(reserveData)).rejects.toEqual(
      new AppError("This car is already reserved on the dates selected", 400)
    );
  });

  it("should not be able to update reserve if user not found", async () => {
    user_id = "6432d55f6681bde406c6ef8a";
    car_id = car._id;
    const reserveData = {
      id: reserve_id,
      car_id,
      user_id,
    };

    await expect(updateReserveService.execute(reserveData)).rejects.toEqual(
      new AppError("User not found", 404)
    );
  });

  it("should not be able to create reserve if user not qualified", async () => {
    user_id = userNotQualified._id;

    const reserveData = {
      id: reserve_id,
      car_id,
      user_id,
    };

    await expect(updateReserveService.execute(reserveData)).rejects.toEqual(
      new AppError("User not qualified", 400)
    );
  });

  it("should not be able to create reserve if user already reserved another car", async () => {
    user_id = user._id;

    const reserveData = {
      id: reserve_id,
      car_id: car3._id,
      user_id,
      start_date: new Date("2020-01-01"),
      end_date: new Date("2020-02-01"),
    };

    await expect(updateReserveService.execute(reserveData)).rejects.toEqual(
      new AppError(
        "You can not reserve more then one car at the same time",
        400
      )
    );
  });
});
