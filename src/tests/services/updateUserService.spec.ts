import mongoose from "mongoose";
import { UserQualified } from "../../enums/userQualified";
import AppError from "../../errors/appError";
import IUserRepository from "../../repositories/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import CreateUserService from "../../services/createUserService";
import UpdateUserService from "../../services/updateUserService";

interface Response {
  id: string;
  name?: string;
  cpf?: string;
  birth?: Date;
  email?: string;
  password?: string;
  cep?: string;
  qualified?: string;
}

describe("Update user", () => {
  let userRepository: IUserRepository;
  let createUserService: CreateUserService;
  let updateUserService: UpdateUserService;

  beforeAll(async () => {
    userRepository = new UserRepository();
    createUserService = new CreateUserService(userRepository);
    updateUserService = new UpdateUserService(userRepository);
  });

  it("should be able to update a new user", async () => {
    const userData = {
      name: "Test Name",
      cpf: "123.456.789-01",
      birth: new Date("2000-05-05"),
      email: "test@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    let user = await createUserService.execute(userData);

    let userDataUpdate: Response = {
      id: String(user._id),
      email: "teste3@teste.com",
    };

    const userUpdate = await updateUserService.execute(userDataUpdate);

    expect(userUpdate).toHaveProperty("_id");
  });

  it("should not be able to update user with invalid id", async () => {
    const id = "invalid";

    await expect(updateUserService.execute({ id })).rejects.toEqual(
      new AppError("Id is different from default!", 400)
    );
  });

  it("should not be able to update an unexisting user", async () => {
    const id = "6167fcf8e5fbb540a2c59f68";

    await expect(updateUserService.execute({ id })).rejects.toEqual(
      new AppError("User not found!", 404)
    );
  });

  it("should not be able to update an user with invalid cpf", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "911.464.410-02",
      birth: new Date("2000-05-05"),
      email: "test@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    let user = await createUserService.execute(userData);

    let userDataUpdate: Response = {
      id: String(user._id),
      cpf: "111.111.111-11",
    };

    await expect(updateUserService.execute(userDataUpdate)).rejects.toEqual(
      new AppError("CPF is not valid!", 400)
    );
  });

  it("should not be able to update an user with same cpf", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "622.763.000-43",
      birth: new Date("2000-05-05"),
      email: "test2@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    let user = await createUserService.execute(userData);

    let userDataUpdate: Response = {
      id: String(user._id),
      cpf: "622.763.000-43",
    };

    await expect(updateUserService.execute(userDataUpdate)).rejects.toEqual(
      new AppError("User with this CPF already exists!", 400)
    );
  });

  it("should not be able to update an user with age under 18", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "847.237.900-04",
      birth: new Date("2000-01-01"),
      email: "test50@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    let user = await createUserService.execute(userData);

    let userDataUpdate: Response = {
      id: String(user._id),
      birth: new Date(),
    };

    await expect(updateUserService.execute(userDataUpdate)).rejects.toEqual(
      new AppError("You need to be at least 18 years old!", 400)
    );
  });

  it("should not be able to update an user with same email", async () => {
    const userData = {
      name: "Test Existing Name",
      cpf: "174.503.700-42",
      birth: new Date("2000-05-05"),
      email: "testexisting@test.com",
      password: "123456",
      cep: "79009-450",
      qualified: UserQualified.yes,
    };

    let user = await createUserService.execute(userData);

    let userDataUpdate: Response = {
      id: String(user._id),
      email: "testexisting@test.com",
    };

    await expect(updateUserService.execute(userDataUpdate)).rejects.toEqual(
      new AppError("User with this email already exists!", 400)
    );
  });
});
