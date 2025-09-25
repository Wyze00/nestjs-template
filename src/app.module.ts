import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TemplateModule } from './module/template/template.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
    imports: [CommonModule, TemplateModule, AuthModule],
})
export class AppModule {}
