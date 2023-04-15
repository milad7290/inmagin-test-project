import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description reveal ip from http request headers.
 */
export const IP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return (
      request.headers['x-forwarded-for'] || request.connection.remoteAddress
    );
  },
);
