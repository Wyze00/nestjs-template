import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/provider/prisma.service';

@Injectable()
export class TestService {
    constructor(private readonly prismaService: PrismaService) {}

    async removeTemplate() {
        await this.prismaService.template.deleteMany({
            where: {
                username: 'dummy1',
            },
        });
    }
    async createTemplate() {
        await this.prismaService.template.create({
            data: {
                username: 'dummy1',
            },
        });
    }
}
