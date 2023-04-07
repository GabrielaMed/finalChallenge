import CarDTO from "../dtos/carDTO";
import { CarModel } from "../models/car";
import ICarRepository from "./ICarRepository";

class CarRepository implements ICarRepository {
  public async findById(id: string): Promise<CarDTO | null> {
    return await CarModel.findById(id);
  }

  public async listAll(
    skip: number,
    limit: number,
    params?: object
  ): Promise<CarDTO[]> {
    let user;
    if (!params) {
      user = await CarModel.find().skip(skip).limit(limit);
    } else {
      user = await CarModel.find(params).skip(skip).limit(limit);
    }

    return user;
  }

  public async countDocuments(query?: object): Promise<number> {
    return await CarModel.countDocuments(query);
  }

  public async create(data: CarDTO): Promise<CarDTO> {
    const {
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    } = data;

    const car = await CarModel.create({
      model,
      color,
      year,
      value_per_day,
      accessories,
      number_of_passengers,
    });

    return car;
  }

  public async delete(id: string): Promise<void | null> {
    return await CarModel.findByIdAndDelete(id);
  }

  public async update(id: string, params: object): Promise<CarDTO | null> {
    return await CarModel.findByIdAndUpdate(
      id,
      { ...params },
      { new: true, runValidators: true }
    );
  }
}

export default CarRepository;
