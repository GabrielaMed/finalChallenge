import { UserQualified } from "../../enums/userQualified";
import AppError from "../../errors/appError";
import IUserRepository from "../../repositories/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import CreateUserService from "../../services/createUserService";

describe("Create user", () => {
  let userRepository: IUserRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    userRepository = new UserRepository();
    createUserService = new CreateUserService(userRepository);
  });
  it("should be able to create a new user", async () => {
    const userData = {
      name: "Test Name",
      cpf: "123.456.789-01",
      birth: new Date("2000-05-05"),
      email: "test@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("_id");
  });

  it("should not be able to create an user with invalid cpf", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "111.111.111-11",
      birth: new Date("2000-05-05"),
      email: "test@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new AppError("CPF is not valid!", 400)
    );
  });

  it("should not be able to create an user with age under 18", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "123.456.789-01",
      birth: new Date(),
      email: "test@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new AppError("You need to be at least 18 years old!", 400)
    );
  });

  it("should not be able to create an user with same cpf", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "622.763.000-43",
      birth: new Date("2000-05-05"),
      email: "test2@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new AppError("User with this CPF already exists!", 400)
    );
  });

  it("should not be able to create an user with same email", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "174.503.700-42",
      birth: new Date("2000-05-05"),
      email: "testexisting@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    const userData2 = {
      name: "Test Existing Name",
      cpf: "117.021.810-57",
      birth: new Date("2000-05-05"),
      email: "testexisting@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData2)).rejects.toEqual(
      new AppError("User with this email already exists!", 400)
    );
  });
});
