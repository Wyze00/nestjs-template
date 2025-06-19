import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException, Error)
export class ErrorFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse<Response>();

        if (exception instanceof HttpException) {
            response.status(exception.getStatus()).json({
                errors: exception.getResponse(),
            });
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                errors: exception.message,
            });
        }
    }
}
