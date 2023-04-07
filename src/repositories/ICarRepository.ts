import CarDTO from "../dtos/carDTO";

export default interface ICarRepository {
  findById(id: string): Promise<CarDTO | null>;
  listAll(skip: number, limit: number, params?: object): Promise<CarDTO[]>;
  countDocuments(query?: object): Promise<number>;
  create(createCarDTO: CarDTO): Promise<CarDTO>;
  delete(id: string): Promise<void | null>;
  update(id: string, params: object): Promise<CarDTO | null>;
}
