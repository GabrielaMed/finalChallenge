import IUserRepository from "./IUserRepository";
import { UserModel } from "../models/user";
import UserDTO from "../dtos/userDTO";

class UserRepository implements IUserRepository {
  public async findById(id: string): Promise<UserDTO | null> {
    return UserModel.findOne({ id });
  }

  public async findByEmail(email: string): Promise<UserDTO | null> {
    return UserModel.findOne({ email });
  }

  public async findByCPF(cpf: string): Promise<UserDTO | null> {
    return UserModel.findOne({ cpf });
  }

  public async create(data: UserDTO): Promise<UserDTO> {
    const {
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
      patio,
      complement,
      neighborhood,
      locality,
      uf,
    } = data;

    const user = await UserModel.create({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
      patio,
      complement,
      neighborhood,
      locality,
      uf,
    });

    return user;
  }
}

export default UserRepository;
