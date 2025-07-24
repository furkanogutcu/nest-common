import { IValidationErrorDetails } from './validation-error-detail.interface';

export interface IErrorResponse {
  error: {
    code: string;
    message: string;
    details?: IValidationErrorDetails[];
  };
}
