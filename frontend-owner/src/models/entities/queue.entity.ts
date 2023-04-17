import { IBase } from "./base.entity";
import { IRestaurant } from "./restaurant.entity";

export interface IQueue extends IBase {
  queueNo: number;
  headcount: number;
  isSettled: boolean;
  settledReport: string;
  restaurantId: string;
  restaurant: IRestaurant;
}
