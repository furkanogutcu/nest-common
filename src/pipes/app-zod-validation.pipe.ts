import { ArgumentMetadata, Injectable } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { AppValidationException } from '../exceptions';

@Injectable()
export class AppZodValidationPipe extends ZodValidationPipe {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const zodSchema = (metadata?.metatype as any)?.schema;

    if (!zodSchema) return value;

    const parseResult = zodSchema.safeParse(value);

    if (!parseResult.success) throw new AppValidationException(parseResult.error);

    return parseResult.data;
  }
}
