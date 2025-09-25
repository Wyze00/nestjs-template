import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './provider/prisma.service';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple(),
                    ),
                }),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                }),
            ],
            level: 'debug',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
                PORT: Joi.number().default(3000),
                HOST: Joi.string().default('0.0.0.0'),
                DATABASE_URL: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_REFRESH_SECRET: Joi.string().required(),
            }),
        }),
        // JwtModule.registerAsync({
        //     useFactory: (configService: ConfigService) => {
        //         const pass =
        //             configService.get<string>('JWT_SECRET') || 'RAHASIA';

        //         return {
        //             global: true,
        //             secret: pass,
        //             signOptions: {
        //                 expiresIn: '1h',
        //             },
        //         };
        //     },
        //     inject: [ConfigService],
        // }),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 100,
                },
            ],
        }),
    ],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class CommonModule {}
