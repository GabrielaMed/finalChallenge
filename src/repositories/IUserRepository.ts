import UserDTO from "../dtos/userDTO";

export default interface IUserRepository {
  findById(id: string): Promise<UserDTO | null>;
  findByEmail(email: string): Promise<UserDTO | null>;
  findByCPF(cpf: string): Promise<UserDTO | null>;
  create(createUserDTO: UserDTO): Promise<UserDTO>;
}
