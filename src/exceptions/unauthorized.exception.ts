import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppUnauthorizedException<TDetails = undefined> extends AppException<TDetails> {
  constructor({
    message = 'Access denied.',
    code,
    details,
  }: { message?: string; code?: string; details?: TDetails } = {}) {
    super({
      message,
      code: code || ExceptionCode.Unauthorized,
      httpCode: HttpStatus.UNAUTHORIZED,
      details,
    });
  }
}
