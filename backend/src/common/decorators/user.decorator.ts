import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../models/entities/user.entity';

/**
 * @description  reveal user from http request.
 * @returns extended user
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    return ctx.switchToHttp().getRequest().userEntity;
  },
);
