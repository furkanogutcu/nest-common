import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { paginationSchema } from '../validations/pagination.validation';

export const Pagination = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();

  return paginationSchema.parse(request.query);
});
