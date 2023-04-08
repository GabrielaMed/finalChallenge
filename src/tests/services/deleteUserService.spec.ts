import mongoose from "mongoose";
import { UserQualified } from "../../enums/userQualified";
import IUserRepository from "../../repositories/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import CreateUserService from "../../services/createUserService";
import DeleteUserService from "../../services/deleteUserService";
import AppError from "../../errors/appError";

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

describe("Delete user", () => {
  let userRepository: IUserRepository;
  let deleteUserService: DeleteUserService;
  let createUserService: CreateUserService;
  let user: Response;

  beforeAll(async () => {
    userRepository = new UserRepository();
    deleteUserService = new DeleteUserService(userRepository);
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

  it("should be able to delete a user", async () => {
    const id = user._id;

    const deletedUser = await deleteUserService.execute(String(id)!);

    expect(deletedUser).toBe(undefined);
  });

  it("should not be able to delete an user with invalid id", async () => {
    const id = "invalid";

    await expect(deleteUserService.execute(id)).rejects.toEqual(
      new AppError("Id is different from default!", 400)
    );
  });

  it("should not be able to delete an unexisting user", async () => {
    const id = "6167fcf8e5fbb540a2c59f68";

    await expect(deleteUserService.execute(id)).rejects.toEqual(
      new AppError("User not found!", 404)
    );
  });
});
