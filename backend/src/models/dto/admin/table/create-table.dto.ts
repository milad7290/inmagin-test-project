import { Transform } from 'class-transformer'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNumber, IsString, IsUUID, MaxLength } from 'class-validator'
import { HtmlSanitizer } from '../../../../common/validators/html-sanitize'

export class CreateTableDto {
  @IsString()
  @MaxLength(150)
  @Transform(HtmlSanitizer)
  name: string

  @IsNumber()
  chairNo: number

  @IsUUID('4')
  restaurantId: string
}
