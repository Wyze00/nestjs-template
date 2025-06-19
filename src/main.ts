import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Use Logger
    const logger: Logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
    app.useLogger(logger);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
