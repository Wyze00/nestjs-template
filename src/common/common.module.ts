import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
            level: 'debug',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
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
    providers: [PrismaService],
    exports: [PrismaService],
})
export class CommonModule {}
