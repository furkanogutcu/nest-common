import { ArgumentMetadata, Injectable } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import * as z from 'zod/v4/core';

import { AppValidationException } from '../exceptions';

@Injectable()
export class AppZodValidationPipe extends ZodValidationPipe {
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return super.transform(value, metadata);
    } catch (error: any) {
      if (error.error && error.error instanceof z.$ZodError) {
        throw new AppValidationException(error.error);
      }

      throw new AppValidationException();
    }
  }
}
