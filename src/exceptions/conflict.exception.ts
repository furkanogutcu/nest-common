import { HttpStatus } from '@nestjs/common';

import { AppException } from './app.exception';
import { IValidationErrorDetails } from './interfaces/validation-error-detail.interface';
import { ExceptionCode } from './reference/exception-code.reference';
import { ValidationErrorType } from './reference/validation-error-type.reference';

export class AppConflictException extends AppException {
  readonly conflictedFields: string[];

  constructor({ conflictedFields }: { conflictedFields: string[] }) {
    super({
      message: 'Some fields already exists.',
      code: ExceptionCode.SomeFieldsAlreadyExists,
      httpCode: HttpStatus.CONFLICT,
      details: AppConflictException.buildDetails(conflictedFields),
    });

    this.conflictedFields = conflictedFields;
  }

  private static buildDetails(conflictedFields: string[]): IValidationErrorDetails[] {
    return conflictedFields.map((field): IValidationErrorDetails => {
      return {
        type: ValidationErrorType.AlreadyExists,
        path: field,
        message: `${field} already exists`,
      };
    });
  }
}
