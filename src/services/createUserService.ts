import UserDTO from "../dtos/userDTO";
import { UserQualified } from "../enums/userQualified";
import AppError from "../errors/appError";
import IUserRepository from "../repositories/IUserRepository";
import UserRepository from "../repositories/userRepository";
import GetCEPComplementsService from "./getCEPComplementsService";
import ValidateAgeService from "./validateAgeService";
import ValidateCPFService from "./validateCPFService";

interface Request {
  name: string;
  cpf: string;
  birth: Date;
  email: string;
  password: string;
  cep: string;
  qualified: UserQualified;
}

class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: Request): Promise<UserDTO> {
    const { name, cpf, birth, email, password, cep, qualified } = data;
    let userExists;

    const getCEPComplements = new GetCEPComplementsService();
    const validateCPF = new ValidateCPFService();
    const validateAge = new ValidateAgeService();

    const addressInfo = await getCEPComplements.handle(cep);

    const cpfValid = validateCPF.handle(cpf);

    if (!cpfValid) {
      throw new AppError("CPF is not valid!", 400);
    }

    const ageEighteenOrAbove = validateAge.handle(birth);

    if (!ageEighteenOrAbove) {
      throw new AppError("You need to be at least 18 years old!", 400);
    }

    userExists = await this.userRepository.findByCPF(cpf);

    if (userExists) {
      throw new AppError("User with this CPF already exists!", 400);
    }

    userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("User with this email already exists!", 400);
    }

    const user = await this.userRepository.create({
      name,
      cpf,
      birth,
      email,
      password,
      cep: addressInfo.cep,
      qualified,
      patio: addressInfo.logradouro,
      complement: addressInfo.complemento,
      neighborhood: addressInfo.bairro,
      locality: addressInfo.localidade,
      uf: addressInfo.uf,
    });

    user.password = undefined;

    return user;
  }
}

export default CreateUserService;
