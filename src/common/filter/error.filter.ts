import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError, HttpException, Error)
export class ErrorFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    catch(exception: Error, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse<Response>();
        const request: Request = host.switchToHttp().getRequest<Request>();

        this.logger.info(
            `[Request Error From] ${request.path} : ${exception.message}`,
        );

        const status: number =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            errors:
                exception instanceof HttpException
                    ? exception.getResponse()
                    : exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
