/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(2, 254)
  email: string;

  @IsString()
  @Length(4, 50)
  password: string;
}
