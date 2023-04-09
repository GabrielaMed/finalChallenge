import CarDTO from "../dtos/carDTO";
import { CarModel } from "../models/car";
import ICarRepository from "./ICarRepository";

class CarRepository implements ICarRepository {
  async createAccessory(
    carId: string,
    description: string
  ): Promise<CarDTO | null> {
    return await CarModel.findOneAndUpdate(
      { _id: carId },
      { $push: { accessories: { description: description } } },
      { new: true }
    );
  }
  async findAccessoryById(
    carId: string,
    accessoryId: string
  ): Promise<CarDTO | null> {
    return await CarModel.findOne({
      _id: carId,
      "accessories._id": accessoryId,
    });
  }

  public async findAccessoryByDescription(
    carId: string,
    description: string
  ): Promise<CarDTO | null> {
    return await CarModel.findOne({
      _id: carId,
      "accessories.description": description,
    });
  }

  public async updateAccessory(
    carId: string,
    accessoryId: string,
    description: string
  ): Promise<CarDTO | null> {
    return await CarModel.findOneAndUpdate(
      { _id: carId, "accessories._id": accessoryId },
      { $set: { "accessories.$.description": description } },
      { new: true }
    );
  }

  public async deleteAccessoryById(
    carId: string,
    accessoryId: string
  ): Promise<void | null> {
    return await CarModel.findByIdAndUpdate(carId, {
      $pull: { accessories: { _id: accessoryId } },
    });
  }

  public async findById(id: string): Promise<CarDTO | null> {
    return await CarModel.findById(id);
  }

  public async listAll(
    skip: number,
    limit: number,
    params?: object,
    description?: string
  ): Promise<CarDTO[]> {
    let car;

    if (params && description) {
      car = await CarModel.find({
        ...params,
        accessories: { $elemMatch: { description: description } },
      })
        .skip(skip)
        .limit(limit);
    } else if (params && !description) {
      car = await CarModel.find(params).skip(skip).limit(limit);
    } else if (!params && description !== undefined) {
      car = await CarModel.find({
        accessories: { $elemMatch: { description: description } },
      })
        .skip(skip)
        .limit(limit);
    } else {
      car = await CarModel.find().skip(skip).limit(limit);
    }

    return car;
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
