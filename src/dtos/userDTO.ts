import { UserQualified } from "../enums/userQualified";

export default interface UserDTO {
  [x: string]: any;
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
