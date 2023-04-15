import { Transform } from 'class-transformer';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsUUID, MaxLength } from 'class-validator';
import { HtmlSanitizer } from '../../../../common/validators/html-sanitize';

export class CreateQueueDto {
  @IsString()
  @MaxLength(150)
  @Transform(HtmlSanitizer)
  name: string;

  @IsUUID('4')
  restaurantId: string;
}
