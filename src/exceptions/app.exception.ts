import { HttpStatus } from '@nestjs/common';

import { IErrorResponse } from './interfaces/error-response.interface';
import { IValidationErrorDetails } from './interfaces/validation-error-detail.interface';
import { ExceptionCode } from './reference/exception-code.reference';

export class AppException extends Error {
  readonly code: ExceptionCode;
  readonly httpCode: HttpStatus;
  readonly details?: IValidationErrorDetails[];

  constructor({ message, httpCode, code, details }: IErrorResponse['error'] & { httpCode: HttpStatus }) {
    super(message);

    this.httpCode = httpCode;
    this.code = code;
    this.details = details;
  }

  toJSON(): IErrorResponse {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
      },
    };
  }
}
