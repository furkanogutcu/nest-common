import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FindOptionsOrder } from 'typeorm';

import { createOrderBySchema } from '../validations/order-by.validation';

export type OrderByParam<Entity> = FindOptionsOrder<Entity> | undefined;

export const OrderBy = <Entity>(fields: (keyof Entity)[]) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext): OrderByParam<Entity> => {
    const request: Request = ctx.switchToHttp().getRequest();

    const orderBySchema = createOrderBySchema(fields as string[]);

    return orderBySchema.parse(request.query).order_by as any;
  })();
