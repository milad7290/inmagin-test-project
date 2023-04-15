import { IBase } from "./base.entity";
import { IQueue } from "./queue.entity";
import { ITable } from "./table.entity";
import { IUser } from "./user.entity";

export interface IRestaurant extends IBase {
  name: string;
  maxNumberOfTables: number;
  maxNumberOfChairsPerTable: number;
  tables: ITable[];
  queues: IQueue[];
  owner: IUser;
}
