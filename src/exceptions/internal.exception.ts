import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppInternalException<TDetails = undefined> extends AppException<TDetails> {
  readonly originalError?: Error;

  constructor({
    message = 'An unexpected error occurred.',
    code,
    error,
    details,
  }: { message?: string; code?: string; error?: Error; details?: TDetails } = {}) {
    super({
      message,
      code: code || ExceptionCode.UnexpectedError,
      httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
      details,
    });

    this.originalError = error;
  }
}
