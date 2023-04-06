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

    const getCEPComplements = new GetCEPComplementsService();
    const validateCPF = new ValidateCPFService();
    const validateAge = new ValidateAgeService();

    console.log("1");
    const addressInfo = await getCEPComplements.handle(cep);
    console.log("2");

    const cpfValid = validateCPF.handle(cpf);
    console.log("3");

    if (!cpfValid.valid) {
      throw new AppError("CPF is not valid!", 400);
    }
    console.log("4");
    const ageEighteenOrAbove = validateAge.handle(birth);
    console.log("5");

    if (!ageEighteenOrAbove) {
      throw new AppError("You need to be at least 18 years old!", 400);
    }
    console.log("6");

    let userExists = await this.userRepository.findByCPF(cpfValid.cpf);
    console.log("7");

    if (userExists) {
      throw new AppError("User with this CPF already exists!", 400);
    }
    console.log("8");

    userExists = await this.userRepository.findByEmail(email);
    console.log("9");

    if (userExists) {
      throw new AppError("User with this email already exists!", 400);
    }
    console.log("10");

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

    return user;
  }
}

export default CreateUserService;
