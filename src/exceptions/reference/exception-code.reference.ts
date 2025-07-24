export enum ExceptionCode {
  BadRequest = 'bad_request',
  SomeFieldsAlreadyExists = 'some_fields_already_exists',
  InsufficientPermissions = 'insufficient_permissions',
  UnexpectedError = 'unexpected_error',
  ResourceNotFound = 'resource_not_found',
  RateLimit = 'rate_limit',
  Unauthorized = 'unauthorized',
  UnprocessableEntity = 'unprocessable_entity',
  ValidationFailed = 'validation_failed',
}
