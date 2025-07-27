import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

import { AppException } from '../app.exception';
import { AppConflictException } from '../conflict.exception';
import { AppNotFoundException } from '../not-found.exception';
import { AppUnprocessableEntityException } from '../unprocessable-entity.exception';

export class TypeORMExceptionTransformer {
  static transform(exception: TypeORMError): AppException<any> | undefined {
    if (exception instanceof EntityNotFoundError) {
      return this.transformEntityNotFoundError(exception);
    }

    if (exception instanceof QueryFailedError) {
      const exceptionCode = (exception as any).code;

      const transformer = TypeORMExceptionTransformer.postgresQueryFailedExceptionMapper[+exceptionCode];

      if (transformer) return transformer(exception);
    }
  }

  private static postgresQueryFailedExceptionMapper: Record<
    number,
    (exception: QueryFailedError) => AppException<any> | undefined
  > = {
    // ref: https://www.postgresql.org/docs/current/errcodes-appendix.html
    22003: TypeORMExceptionTransformer.transformNumericOverflowError,
    23505: TypeORMExceptionTransformer.transformConflictError,
  };

  private static transformEntityNotFoundError(exception: EntityNotFoundError): AppNotFoundException {
    const match = exception.message.match(/"([^"]+)"/);

    return new AppNotFoundException({ resourceName: match?.[1] });
  }

  private static transformConflictError(exception: QueryFailedError): AppConflictException | undefined {
    const detail: string | undefined = (exception as any)?.detail;

    if (!detail) return;

    const matches = detail.match(/\(([^)]+)\)/);

    if (matches && matches[1]) {
      return new AppConflictException({ conflictedFields: matches[1].split(', ').map((key: string) => key.trim()) });
    }
  }

  private static transformNumericOverflowError(_exception: QueryFailedError): AppUnprocessableEntityException {
    return new AppUnprocessableEntityException({
      message: 'Numeric field is outside the allowed range',
    });
  }
}
