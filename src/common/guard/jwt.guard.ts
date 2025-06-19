import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RequestUser } from '../dto/request-user.dto';
import { JwtService } from '@nestjs/jwt';

export class JwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: RequestUser = context.switchToHttp().getRequest();

        const token: string | undefined = request.headers.authorization;

        if (token) {
            if (token.startsWith('Bearer ')) {
                const jwt = token.split(' ')[1];

                const isValid = this.jwtService.verify<{ user: string }>(jwt);

                request.user = isValid.user;
                return true;
            }
        }

        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
}
