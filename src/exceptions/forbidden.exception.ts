import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppForbiddenException<TDetails = undefined> extends AppException<TDetails> {
  constructor({
    message = 'You do not have permission to access this resource.',
    code,
    details,
  }: { message?: string; code?: string; details?: TDetails } = {}) {
    super({
      message,
      code: code || ExceptionCode.InsufficientPermissions,
      httpCode: HttpStatus.FORBIDDEN,
      details,
    });
  }
}
