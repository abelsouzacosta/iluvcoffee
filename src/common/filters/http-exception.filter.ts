import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ExceptionFilter');
  }

  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest();
    const response = context.getResponse();

    const status = exception.getStatus();
    const message = exception.getResponse();

    const parsedMessage =
      typeof message === 'string' ? message : JSON.stringify(message);

    this.logger.error(
      `${status} - ${parsedMessage} on path ${request.method}${request.path}`,
    );

    response.status(status).json({
      status,
      message,
      timestamps: new Date().toISOString(),
    });
  }
}
