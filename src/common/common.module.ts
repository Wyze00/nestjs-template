import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

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
    ],
})
export class CommonModule {}
