import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly log: Logger) {}
  /**
   * @description intercept the calling endpoint to log before and after to see how log it take to done.
   * @param context
   * @param next
   * @returns
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log.debug(
      'Before...',
      `${context.getClass().name}/${context.getHandler().name}`,
    );

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.log.debug(
            `After... ${Date.now() - now}ms`,
            `${context.getClass().name}/${context.getHandler().name}`,
          ),
        ),
      );
  }
}
