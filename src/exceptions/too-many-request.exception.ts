import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppTooManyRequestException<TDetails = undefined> extends AppException<TDetails> {
  constructor({
    message = 'You have exceeded the number of allowed requests. Please try again later.',
    code,
    details,
  }: { message?: string; code?: string; details?: TDetails } = {}) {
    super({
      message,
      code: code || ExceptionCode.RateLimit,
      httpCode: HttpStatus.TOO_MANY_REQUESTS,
      details,
    });
  }
}
