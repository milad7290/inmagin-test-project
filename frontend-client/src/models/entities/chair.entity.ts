import { IBase } from "./base.entity";
import { ITable } from "./table.entity";

export interface IChair extends IBase {
  name: string;
  table: ITable;
}
