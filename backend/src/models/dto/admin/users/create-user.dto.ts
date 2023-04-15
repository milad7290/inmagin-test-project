import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @Length(2, 254)
  email: string;

  @IsString()
  @Length(4, 50)
  password: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  phone?: string;

  @IsString()
  @Length(2, 6)
  phonePrefix: string;

  @IsUUID('4', { each: true })
  roles: string[];
}
