import { ICarAccessories } from "../interfaces/ICarAccessories";

export default interface CarDTO {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: ICarAccessories[];
  number_of_passengers: number;
}
