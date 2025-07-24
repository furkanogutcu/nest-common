import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppNotFoundException extends AppException {
  readonly resourceName: string;

  constructor({
    resourceName = 'Resource',
    message,
    code,
  }: { resourceName?: string; message?: string; code?: string } = {}) {
    super({
      message: message || `${resourceName} not found.`,
      code: code || ExceptionCode.ResourceNotFound,
      httpCode: HttpStatus.NOT_FOUND,
    });

    this.resourceName = resourceName;
  }
}
