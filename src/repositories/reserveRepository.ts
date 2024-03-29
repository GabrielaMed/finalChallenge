import ReserveDTO from "../dtos/reserveDTO";
import { ReserveModel } from "../models/reserve";
import IReserveRepository from "./IReserveRepository";

class ReserveRepository implements IReserveRepository {
  async findByUserIdAndDates(
    user_id: string,
    start_date: Date,
    end_date: Date
  ): Promise<ReserveDTO | null> {
    return await ReserveModel.findOne({
      user_id,
      start_date: { $lte: end_date },
      end_date: { $gte: start_date },
    });
  }

  async findByCarIdAndDates(
    car_id: string,
    start_date: Date,
    end_date: Date
  ): Promise<ReserveDTO | null> {
    return await ReserveModel.findOne({
      car_id,
      start_date: { $lte: end_date },
      end_date: { $gte: start_date },
    });
  }

  async findById(id: string): Promise<ReserveDTO | null> {
    return await ReserveModel.findById(id);
  }

  async listAll(
    skip: number,
    limit: number,
    params?: object | undefined
  ): Promise<ReserveDTO[]> {
    let reserve;
    if (!params) {
      reserve = await ReserveModel.find().skip(skip).limit(limit);
    } else {
      reserve = await ReserveModel.find(params).skip(skip).limit(limit);
    }

    return reserve;
  }

  async countDocuments(query?: object): Promise<number> {
    return await ReserveModel.countDocuments(query);
  }

  async create(data: ReserveDTO): Promise<ReserveDTO> {
    const { car_id, user_id, start_date, end_date, final_value } = data;

    const reserve = await ReserveModel.create({
      car_id,
      user_id,
      start_date,
      end_date,
      final_value,
    });

    return reserve;
  }

  async delete(id: string): Promise<void | null> {
    return await ReserveModel.findByIdAndDelete(id);
  }

  async update(id: string, params: object): Promise<ReserveDTO | null> {
    return await ReserveModel.findByIdAndUpdate(
      id,
      { ...params },
      { new: true, runValidators: true }
    );
  }
}

export default ReserveRepository;
