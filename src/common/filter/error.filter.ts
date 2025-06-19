import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
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
            response.status(500).json({
                errors: exception.message,
            });
        }
    }
}
