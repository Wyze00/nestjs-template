import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../dto/request-user.dto';

export const User = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request: RequestUser = context.switchToHttp().getRequest();
        return request.user;
    },
);
