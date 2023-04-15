import { IBase } from "./base.entity";
import { IRestaurant } from "./restaurant.entity";

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  restaurant: IRestaurant;
}
