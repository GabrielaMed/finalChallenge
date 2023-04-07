import mongoose from "mongoose";
import UserDTO from "../dtos/userDTO";
import { UserQualified } from "../enums/userQualified";
import AppError from "../errors/appError";
import IUserRepository from "../repositories/IUserRepository";
import UserRepository from "../repositories/userRepository";
import GetCEPComplementsService from "./getCEPComplementsService";
import ValidateAgeService from "./validateAgeService";
import ValidateCPFService from "./validateCPFService";

interface Request {
  id: string;
  name?: string;
  cpf?: string;
  birth?: Date;
  email?: string;
  password?: string;
  cep?: string;
  qualified?: UserQualified;
}

class UpdateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: Request): Promise<UserDTO | null> {
    const { name, cpf, birth, email, password, cep, qualified, id } = data;
    const getCEPComplements = new GetCEPComplementsService();
    const validateCPF = new ValidateCPFService();
    const validateAge = new ValidateAgeService();

    let addressInfo;
    let cpfValid;
    let ageEighteenOrAbove;
    let userExists;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    let user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    if (cep) {
      addressInfo = await getCEPComplements.handle(cep);
    }
    if (cpf) {
      cpfValid = validateCPF.handle(cpf);

      if (!cpfValid) {
        throw new AppError("CPF is not valid!", 400);
      }

      userExists = await this.userRepository.findByCPF(cpf);

      if (userExists) {
        throw new AppError("User with this CPF already exists!", 400);
      }
    }
    if (birth) {
      ageEighteenOrAbove = validateAge.handle(birth);

      if (!ageEighteenOrAbove) {
        throw new AppError("You need to be at least 18 years old!", 400);
      }
    }

    if (email) {
      userExists = await this.userRepository.findByEmail(email);

      if (userExists) {
        throw new AppError("User with this email already exists!", 400);
      }
    }

    if (addressInfo) {
      user = await this.userRepository.update(id, {
        ...data,
        cep: addressInfo.cep,
        patio: addressInfo.logradouro,
        complement: addressInfo.complemento,
        neighborhood: addressInfo.bairro,
        locality: addressInfo.localidade,
        uf: addressInfo.uf,
      });
    } else {
      user = await this.userRepository.update(id, {
        ...data,
      });
    }

    if (user) {
      user.password = undefined;
    }

    return user;
  }
}

export default UpdateUserService;
