import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppTooManyRequestException extends AppException {
  constructor({
    message = 'You have exceeded the number of allowed requests. Please try again later.',
    code,
  }: { message?: string; code?: ExceptionCode } = {}) {
    super({
      message,
      code: code || ExceptionCode.RateLimit,
      httpCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  }
}
