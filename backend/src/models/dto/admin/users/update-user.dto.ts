import { IsString, IsUUID, Length, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @Length(4, 20)
  phone: string;

  @IsString()
  @Length(2, 6)
  phonePrefix: string;

  @IsUUID('4', { each: true })
  roles: string[];
}
