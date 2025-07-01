import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { TemplateModule } from './module/template/template.module';

@Module({
    imports: [CommonModule, TemplateModule],
})
export class AppModule {}
