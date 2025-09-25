import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from 'src/common/types/jwt-payload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_REFRESH_SECRET');

        if (!secret) {
            throw new Error('Secret Key Not Implemented');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload): JwtPayload {
        const refreshToken = req
            .get('Authorization')!
            .replace('Bearer', '')
            .trim();

        return { ...payload, refreshToken };
    }
}
