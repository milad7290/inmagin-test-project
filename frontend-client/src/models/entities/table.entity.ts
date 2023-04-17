import { IBase } from "./base.entity";
import { IChair } from "./chair.entity";
import { IRestaurant } from "./restaurant.entity";

export interface ITable extends IBase {
  order: number;
  name: string;
  chairsNo: number;
  isAvailable: boolean;
  restaurantId: string;
  restaurant: IRestaurant;
  chairs: IChair[];
}
