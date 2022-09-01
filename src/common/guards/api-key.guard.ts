import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import 'dotenv/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();

    const request = ctx.getRequest<Request>();

    const header = request.headers.authorization;

    if (!header)
      throw new ForbiddenException('No authorization header was provided');

    const [, token] = header.split(' ');

    if (token !== process.env.API_KEY) return false;

    return true;
  }
}
