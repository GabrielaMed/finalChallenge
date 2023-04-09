import ICarRepository from "../../repositories/ICarRepository";
import CreateCarService from "../../services/createCarService";
import CarRepository from "../../repositories/carRepository";
import { UserQualified } from "../../enums/userQualified";
import CreateUserService from "../../services/createUserService";
import CreateReserveService from "../../services/createReserveService";
import UserRepository from "../../repositories/userRepository";
import ReserveRepository from "../../repositories/reserveRepository";
import UserDTO from "../../dtos/userDTO";
import CarDTO from "../../dtos/carDTO";
import IReserveRepository from "../../repositories/IReserveRepository";
import IUserRepository from "../../repositories/IUserRepository";
import ReserveDTO from "../../dtos/reserveDTO";
import AppError from "../../errors/appError";
import DeleteReserveService from "../../services/deleteReserveService";

describe("Delete reserve", () => {
  let reserveRepository: IReserveRepository;
  let userRepository: IUserRepository;
  let carRepository: ICarRepository;
  let createUserService: CreateUserService;
  let deleteReserveService: DeleteReserveService;
  let createReserveService: CreateReserveService;
  let createCarService: CreateCarService;
  let user: UserDTO;
  let car: CarDTO;
  let reserve: ReserveDTO;

  beforeAll(async () => {
    reserveRepository = new ReserveRepository();
    userRepository = new UserRepository();
    carRepository = new CarRepository();
    deleteReserveService = new DeleteReserveService(reserveRepository);
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

    const car_id = car._id;
    const user_id = user._id;

    const reserveData = {
      car_id,
      user_id,
      start_date: new Date("2020-01-01"),
      end_date: new Date("2020-02-01"),
    };

    reserve = await createReserveService.execute(reserveData);
  });

  it("should be able to delete a reserve by id", async () => {
    const id = reserve._id;

    const deleteReserve = await deleteReserveService.execute(String(id));

    expect(deleteReserve).toBe(undefined);
  });

  it("should not be able to delete a reserve with invalid id", async () => {
    const id = "invalid";

    await expect(deleteReserveService.execute(id)).rejects.toEqual(
      new AppError("Id is different from default!", 400)
    );
  });

  it("should not be able to delete an unexisting reserve", async () => {
    const id = "6167fcf8e5fbb540a2c59f68";

    await expect(deleteReserveService.execute(id)).rejects.toEqual(
      new AppError("Reserve not found!", 404)
    );
  });
});
