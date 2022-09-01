import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import 'dotenv/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    const ctx = context.switchToHttp();

    const request = ctx.getRequest<Request>();

    const header = request.headers.authorization;

    if (!header)
      throw new ForbiddenException('No authorization header was provided');

    const [, token] = header.split(' ');

    if (token === process.env.API_KEY || isPublic) return true;

    return false;
  }
}
