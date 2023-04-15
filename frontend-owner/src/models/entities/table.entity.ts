import { IBase } from "./base.entity";
import { IChair } from "./chair.entity";
import { IRestaurant } from "./restaurant.entity";

export interface ITable extends IBase {
  name: string;
  chairsNo: number;
  isAvailable: boolean;
  restaurant: IRestaurant;
  chairs: IChair[];
}
