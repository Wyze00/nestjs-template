import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { LoggerMiddlewae } from './common/middleware/logger.midleware';

@Module({
    imports: [CommonModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddlewae).forRoutes('*');
    }
}
