import { IsUUID } from 'class-validator';

export class RemoveDto {

  @IsUUID('4', { each: true })
  ids: string[];
}
