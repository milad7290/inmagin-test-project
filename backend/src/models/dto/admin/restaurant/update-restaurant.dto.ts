/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNumber, IsUUID } from "class-validator";

export class UpdateRestaurantDto {
  @IsUUID()
  id: string;

  @IsNumber()
  maxNumberOfChairsPerTable: number;

  @IsNumber()
  maxNumberOfTables: number;
}
