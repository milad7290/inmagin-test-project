import { IBase } from "./base.entity";
import { IRestaurant } from "./restaurant.entity";

export interface IQueue extends IBase {
  queueNo: number;
  headcount: number;
  restaurant: IRestaurant;
}
