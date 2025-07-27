import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppBadRequestException<TDetails = undefined> extends AppException<TDetails> {
  constructor({
    message = 'Bad request.',
    code,
    details,
  }: { message?: string; code?: string; details?: TDetails } = {}) {
    super({
      message,
      code: code || ExceptionCode.BadRequest,
      httpCode: HttpStatus.BAD_REQUEST,
      details,
    });
  }
}
