import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppBadRequestException extends AppException {
  constructor({ message = 'Bad request.', code }: { message?: string; code?: string } = {}) {
    super({
      message,
      code: code || ExceptionCode.BadRequest,
      httpCode: HttpStatus.BAD_REQUEST,
    });
  }
}
