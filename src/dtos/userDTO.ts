import { UserQualified } from "../enums/userQualified";

export default interface UserDTO {
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password: string;
  cep: string;
  qualified: UserQualified;
  patio: string;
  complement: string;
  neighborhood: string;
  locality: string;
  uf: string;
}
