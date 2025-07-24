import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppForbiddenException extends AppException {
  constructor({
    message = 'You do not have permission to access this resource.',
    code,
  }: { message?: string; code?: string } = {}) {
    super({
      message,
      code: code || ExceptionCode.InsufficientPermissions,
      httpCode: HttpStatus.FORBIDDEN,
    });
  }
}
