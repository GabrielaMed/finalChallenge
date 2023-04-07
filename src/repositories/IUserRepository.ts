import UserDTO from "../dtos/userDTO";

export default interface IUserRepository {
  findById(id: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  findByCPF(cpf: string): Promise<UserDTO | null>;
  listAll(skip: number, limit: number, params?: object): Promise<UserDTO[]>;
  countDocuments(query?: object): Promise<number>;
  create(createUserDTO: UserDTO): Promise<UserDTO>;
  delete(id: string): Promise<void | null>;
  update(id: string, params: object): Promise<UserDTO | null>;
}
