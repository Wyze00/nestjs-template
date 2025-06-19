import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Use CORS
    app.enableCors();

    // Use Logger
    const logger: Logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);

    // Use Config
    const configService: ConfigService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT') || 3000;
    const HOST = configService.get<string>('HOST') || 'localhost';

    await app.listen(PORT || 3000, () => {
        console.log(`Application start at : http://${HOST}:${PORT}`);
    });
}
bootstrap();
