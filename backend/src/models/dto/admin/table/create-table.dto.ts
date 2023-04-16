/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNumber, IsUUID } from "class-validator";

export class CreateTableDto {
  @IsNumber()
  chairNo: number;

  @IsUUID("4")
  restaurantId: string;
}
