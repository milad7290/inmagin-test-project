import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserType } from '../../models/enums/user/user-type.enum';

/**
 * @description set an array of user types to endpoint metadata (it will be user in permission guard).
 * @param types
 */
export const SetTypes = (types: UserType[]): CustomDecorator<string> =>
  SetMetadata('types', types);
