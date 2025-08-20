import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import * as z from 'zod/v4/core';

import { AppException } from '../app.exception';
import { AppInternalException } from '../internal.exception';
import { NestJSExceptionTransformer } from '../transformers/nestjs.exception-transformer';
import { TypeORMExceptionTransformer } from '../transformers/typeorm.exception-transformer';
import { AppValidationException } from '../validation.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    try {
      if (exception instanceof AppException) {
        if (exception instanceof AppInternalException) this.logger.error(exception);

        return response.status(exception.httpCode).json(exception.toJSON());
      }

      let appException: AppException | undefined;

      if (exception instanceof z.$ZodError) {
        appException = new AppValidationException(exception);
      } else if (exception instanceof TypeORMError) {
        appException = TypeORMExceptionTransformer.transform(exception);
      } else if (exception instanceof HttpException) {
        appException = NestJSExceptionTransformer.transform(exception);
      }

      if (!appException) {
        appException = new AppInternalException({ error: exception });
      }

      if (appException instanceof AppInternalException) this.logger.error(appException);

      return response.status(appException.httpCode).json(appException.toJSON());
    } catch (error: any) {
      const err = new AppInternalException({ error });

      this.logger.error(err);

      return response.status(err.httpCode).json(err.toJSON());
    }
  }
}
