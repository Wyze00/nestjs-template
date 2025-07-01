import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from 'src/common/provider/prisma.service';

@Injectable()
export class TemplateService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createTemplateDto: CreateTemplateDto) {
        const template = await this.prismaService.template.create({
            data: {
                username: createTemplateDto.username,
            },
        });

        return template;
    }

    async findAll() {
        const template = await this.prismaService.template.findMany();
        return template;
    }

    async findOne(username: string) {
        const template = await this.prismaService.template.findUnique({
            where: { username },
        });

        return template;
    }

    async update(username: string, updateTemplateDto: UpdateTemplateDto) {
        const template = await this.prismaService.template.update({
            where: { username },
            data: {
                username: updateTemplateDto.username,
            },
        });

        return template;
    }

    async remove(username: string) {
        await this.prismaService.template.deleteMany({
            where: {
                username,
            },
        });

        return true;
    }
}
