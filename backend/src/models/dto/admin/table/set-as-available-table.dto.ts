/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsUUID } from "class-validator";

export class SetAsAvailableTableDto {
  @IsUUID("4")
  tableId: string;
}
