import { Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import CreateUserService from "../services/createUserService";
import DeleteUserService from "../services/deleteUserService";
import GetUserByIdService from "../services/getUserByIdService";
import ListAllUserService from "../services/listAllUserService";
import UpdateUserService from "../services/updateUserService";
import { createUserValidator } from "../validators/createUserValidator";
import { updateUserValidator } from "../validators/updateUserValidator";

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cpf, birth, email, password, cep, qualified } = req.body;

    const validationResult = createUserValidator.safeParse({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json(errorFormatted);
    }

    const userRepository = new UserRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });

    return res
      .status(201)
      .json({ message: "User created successfully!", user });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = new UserRepository();
    const deleteUser = new DeleteUserService(userRepository);

    await deleteUser.execute(id);

    return res.status(204).send();
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = new UserRepository();
    const getUserById = new GetUserByIdService(userRepository);

    const user = await getUserById.execute(id);

    return res.status(200).json({ user });
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    const { page = "1", limit = "10", ...params } = req.query;

    const userRepository = new UserRepository();
    const getUser = new ListAllUserService(userRepository);

    const query = {
      ...params,
    };

    let user;
    if (params) {
      user = await getUser.execute(Number(page), Number(limit), query);
    } else {
      user = await getUser.execute(Number(page), Number(limit));
    }

    return res.status(200).json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { ...data } = req.body;
    const userRepository = new UserRepository();
    const updateUser = new UpdateUserService(userRepository);

    const validationResult = updateUserValidator.safeParse({
      ...data,
    });

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return res.status(400).json(errorFormatted);
    }

    const user = await updateUser.execute({ id, ...data });

    return res.status(200).json({ user });
  }
}

export default UserController;
