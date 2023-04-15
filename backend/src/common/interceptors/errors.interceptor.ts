import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  /**
   * @description intercept the raise error to log the error in sentry and ext...
   * @param context 
   * @param call$ 
   * @returns 
   */
  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    return call$.handle().pipe(
      catchError((err) => {
        let stringErr = '';
        try {
          stringErr = err ? (err.message ? err.message : err) : '';
        } catch (error) {}
        if (err.status) {
          if (err.status !== HttpStatus.I_AM_A_TEAPOT) {
            this.logger.error(
              stringErr,
              `${context.getClass().name}/${context.getHandler().name}`,
              err.status.toString(),
            );
          }
          return throwError(new HttpException(stringErr, err.status));
        }
        this.logger.error(
          stringErr,
          `${context.getClass().name}/${context.getHandler().name}`,
          HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        );
        return throwError(
          new HttpException(stringErr, HttpStatus.INTERNAL_SERVER_ERROR),
        );
      }),
    );
  }
}
