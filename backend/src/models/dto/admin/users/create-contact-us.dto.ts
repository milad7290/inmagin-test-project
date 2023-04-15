/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @Length(2, 254)
  email: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(2, 6)
  phonePrefix: string;

  @IsString()
  @MaxLength(150)
  subject: string;

  @IsString()
  @MaxLength(150)
  message: string;

  @IsString()
  recaptcha: string;
}
