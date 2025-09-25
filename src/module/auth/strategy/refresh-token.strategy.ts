import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import {
    AccessTokenPayload,
    RefreshTokenPayload,
} from 'src/common/types/auth.types';

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

    validate(req: Request, payload: AccessTokenPayload): RefreshTokenPayload {
        const refreshToken = req
            .get('Authorization')!
            .replace('Bearer', '')
            .trim();

        return { ...payload, refreshToken };
    }
}
