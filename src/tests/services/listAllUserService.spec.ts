import { UserQualified } from "../../enums/userQualified";
import AppError from "../../errors/appError";
import IUserRepository from "../../repositories/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import CreateUserService from "../../services/createUserService";
import ListAllUserService from "../../services/listAllUserService";

describe("List all users", () => {
  let userRepository: IUserRepository;
  let listAllUserService: ListAllUserService;
  let createUserService: CreateUserService;
  let user;

  beforeAll(async () => {
    userRepository = new UserRepository();
    listAllUserService = new ListAllUserService(userRepository);
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

  it("should be able to list all users", async () => {
    const limit = 2;
    const page = 1;
    const users = [await listAllUserService.execute(page, limit)];

    expect(users.length).toBeGreaterThan(0);
  });

  it("should not be able to return something if user is not found", async () => {
    const limit = 2;
    const page = 1;
    const name = "Unexisting name";

    await expect(
      listAllUserService.execute(page, limit, { name })
    ).rejects.toEqual(new AppError("User not found", 404));
  });
});
