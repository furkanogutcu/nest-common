import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppUnprocessableEntityException extends AppException {
  constructor({ message = 'Unprocessable entity.', code }: { message?: string; code?: string } = {}) {
    super({
      message,
      code: code || ExceptionCode.UnprocessableEntity,
      httpCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
