import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();

    const request = http.getRequest<Request>();

    return request.protocol;
  },
);
