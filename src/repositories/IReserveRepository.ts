import ReserveDTO from "../dtos/reserveDTO";
import UserDTO from "../dtos/userDTO";

export default interface IReserveRepository {
  findById(id: string): Promise<ReserveDTO | null>;
  findByCarIdAndDates(
    car_id: string,
    start_date: Date,
    end_date: Date
  ): Promise<ReserveDTO | null>;
  findByUserIdAndDates(
    user_id: string,
    start_date: Date,
    end_date: Date
  ): Promise<ReserveDTO | null>;
  listAll(skip: number, limit: number, params?: object): Promise<ReserveDTO[]>;
  countDocuments(query?: object): Promise<number>;
  create(createReserveDTO: ReserveDTO): Promise<ReserveDTO>;
  delete(id: string): Promise<void | null>;
  update(id: string, params: object): Promise<ReserveDTO | null>;
}
