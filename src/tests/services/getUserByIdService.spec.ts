import mongoose from "mongoose";
import { UserQualified } from "../../enums/userQualified";
import IUserRepository from "../../repositories/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import CreateUserService from "../../services/createUserService";
import AppError from "../../errors/appError";
import GetUserByIdService from "../../services/getUserByIdService";

interface Response {
  _id?: mongoose.Types.ObjectId;
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password?: string;
  cep: string;
  qualified: string;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
}

describe("Get user by id", () => {
  let userRepository: IUserRepository;
  let getUserByIdService: GetUserByIdService;
  let createUserService: CreateUserService;
  let user: Response;

  beforeAll(async () => {
    userRepository = new UserRepository();
    getUserByIdService = new GetUserByIdService(userRepository);
    createUserService = new CreateUserService(userRepository);

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
  });

  it("should be able to get user by id", async () => {
    const id = user._id;

    const userExists = await getUserByIdService.execute(String(id)!);

    expect(userExists).toHaveProperty("_id");
  });

  it("should not be able to get user with invalid id", async () => {
    const id = "invalid";

    await expect(getUserByIdService.execute(id)).rejects.toEqual(
      new AppError("Id is different from default!", 400)
    );
  });

  it("should not be able to get an unexisting user", async () => {
    const id = "6167fcf8e5fbb540a2c59f68";

    await expect(getUserByIdService.execute(id)).rejects.toEqual(
      new AppError("User not found!", 404)
    );
  });
});
