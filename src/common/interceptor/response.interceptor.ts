import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { WebResponse } from '../dto/web-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<WebResponse<T>> {
        return next.handle().pipe(
            map((val: T) => ({
                data: val,
            })),
        );
    }
}
