import { HttpStatus } from '@nestjs/common';
import * as z from 'zod/v4/core';

import { AppException } from './app.exception';
import { IValidationErrorDetails } from './interfaces/validation-error-detail.interface';
import { ExceptionCode } from './reference/exception-code.reference';
import { ValidationErrorType } from './reference/validation-error-type.reference';

export class AppValidationException extends AppException<IValidationErrorDetails[]> {
  readonly zodError: z.$ZodError;

  constructor(error?: z.$ZodError) {
    super({
      code: ExceptionCode.ValidationFailed,
      httpCode: HttpStatus.BAD_REQUEST,
      message: 'Invalid request payload.',
      details: error ? AppValidationException.buildDetails(error) : undefined,
    });

    if (error) {
      this.zodError = error;
    }
  }

  private static buildDetails(zodError: z.$ZodError): IValidationErrorDetails[] {
    return zodError.issues.flatMap((error): IValidationErrorDetails[] => {
      const type = this.detectDetailType(error);

      const paths = error.path.map((item) => item.toString());

      if (error.code === 'unrecognized_keys') {
        return error.keys.map((key: string) => ({
          type: ValidationErrorType.Unrecognized,
          path: [...paths, key].join('.'),
          message: 'This key is not recognized',
        }));
      }

      return [
        {
          type,
          path: paths.join('.'),
          message: error.message,
        },
      ];
    });
  }

  private static detectDetailType(error: z.$ZodIssue): ValidationErrorType {
    switch (error.code) {
      case 'invalid_type': {
        if (error.message.includes('received undefined')) {
          return ValidationErrorType.MissingField;
        }

        return ValidationErrorType.Invalid;
      }

      case 'unrecognized_keys':
        return ValidationErrorType.Unrecognized;

      default:
        return ValidationErrorType.Invalid;
    }
  }
}
