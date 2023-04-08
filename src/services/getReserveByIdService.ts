import mongoose from "mongoose";
import AppError from "../errors/appError";
import IReserveRepository from "../repositories/IReserveRepository";
import ReserveRepository from "../repositories/reserveRepository";
import ReserveDTO from "../dtos/reserveDTO";

class GetReserveByIdService {
  private reserveRepository: IReserveRepository;

  constructor(reserveRepository: ReserveRepository) {
    this.reserveRepository = reserveRepository;
  }

  public async execute(id: string): Promise<ReserveDTO> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Id is different from default!", 400);
    }

    const reserve = await this.reserveRepository.findById(id);

    if (!reserve) {
      throw new AppError("Reserve not found!", 404);
    }

    return reserve;
  }
}

export default GetReserveByIdService;
