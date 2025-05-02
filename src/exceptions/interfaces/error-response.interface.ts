import { ExceptionCode } from '../reference/exception-code.reference';
import { IValidationErrorDetails } from './validation-error-detail.interface';

export interface IErrorResponse {
  error: {
    code: ExceptionCode;
    message: string;
    details?: IValidationErrorDetails[];
  };
}
