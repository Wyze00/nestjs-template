import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const pass =
                    configService.get<string>('JWT_SECRET') || 'RAHASIA';

                return {
                    global: true,
                    secret: pass,
                    signOptions: {
                        expiresIn: '1h',
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
