import IUserRepository from "./IUserRepository";
import { UserModel } from "../models/user";
import UserDTO from "../dtos/userDTO";

class UserRepository implements IUserRepository {
  public async findById(id: string): Promise<UserDTO | null> {
    return await UserModel.findById(id);
  }

  public async findByEmail(email: string): Promise<UserDTO | null> {
    return await UserModel.findOne({ email });
  }

  public async findByCPF(cpf: string): Promise<UserDTO | null> {
    return await UserModel.findOne({ cpf });
  }

  public async listAll(
    skip: number,
    limit: number,
    params?: object
  ): Promise<UserDTO[]> {
    let user;
    if (!params) {
      user = await UserModel.find().skip(skip).limit(limit);
    } else {
      user = await UserModel.find(params).skip(skip).limit(limit);
    }

    return user;
  }

  public async countDocuments(query?: object): Promise<number> {
    return await UserModel.countDocuments(query);
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

  public async delete(id: string): Promise<void | null> {
    return await UserModel.findByIdAndDelete(id);
  }

  public async update(id: string, params: object): Promise<UserDTO | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      { ...params },
      { new: true, runValidators: true }
    );
  }
}

export default UserRepository;
