import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FindOptionsWhere, Raw } from 'typeorm';

import { searchSchema } from '../validations/search.validation';

export type SearchParams<Entity> = FindOptionsWhere<Entity> | undefined;

export const Search = <Entity>(fields: (keyof Entity)[]) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext): SearchParams<Entity> => {
    const request: Request = ctx.switchToHttp().getRequest();

    const parsed = searchSchema.parse(request.query);

    if (!parsed.q) return;

    return fields.map((field) => ({
      [field]: Raw((alias) => `CAST(${alias} AS TEXT) ILIKE :searchTerm`, { searchTerm: `%${parsed.q}%` }), // * Type casting for uuid columns
    })) as any;
  })();
