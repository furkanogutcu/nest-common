import { ValidationErrorType } from '../reference/validation-error-type.reference';

export interface IValidationErrorDetails {
  type: ValidationErrorType;
  path: string;
  message: string;
}
