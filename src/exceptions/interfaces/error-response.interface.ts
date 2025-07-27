import { IValidationErrorDetails } from './validation-error-detail.interface';

export interface IErrorResponse<TDetails = IValidationErrorDetails[]> {
  error: {
    code: string;
    message: string;
    details?: TDetails;
  };
}
