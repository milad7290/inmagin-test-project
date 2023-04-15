import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthUser } from '../../models/interfaces/auth/auth-user.model';

/**
 * @description reveal user from http request.
 */
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuthUser =>
    ctx.switchToHttp().getRequest().user,
);
