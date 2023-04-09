import CarDTO from "../dtos/carDTO";

export default interface ICarRepository {
  findById(id: string): Promise<CarDTO | null>;
  findAccessoryByDescription(
    carId: string,
    description: string
  ): Promise<CarDTO | null>;
  findAccessoryById(carId: string, accessoryId: string): Promise<CarDTO | null>;
  listAll(
    skip: number,
    limit: number,
    params?: object,
    description?: string
  ): Promise<CarDTO[]>;
  countDocuments(query?: object): Promise<number>;
  create(createCarDTO: CarDTO): Promise<CarDTO>;
  delete(id: string): Promise<void | null>;
  update(id: string, params: object): Promise<CarDTO | null>;
  updateAccessory(
    carId: string,
    accessoryId: string,
    description: string
  ): Promise<CarDTO | null>;
  deleteAccessoryById(carId: string, accessoryId: string): Promise<void | null>;
  createAccessory(carId: string, description: string): Promise<CarDTO | null>;
}
