import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guard/access-token.guard';

@Controller('template')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @ApiBody({
        type: CreateTemplateDto,
    })
    @ApiCreatedResponse({
        type: CreateTemplateDto,
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AccessTokenGuard)
    create(@Body() createTemplateDto: CreateTemplateDto) {
        return this.templateService.create(createTemplateDto);
    }

    @ApiOkResponse({
        type: [CreateTemplateDto],
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll() {
        return this.templateService.findAll();
    }

    @ApiOkResponse({
        type: CreateTemplateDto,
    })
    @Get(':username')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    findOne(@Param('username') username: string) {
        return this.templateService.findOne(username);
    }

    @ApiOkResponse({
        type: CreateTemplateDto,
    })
    @Patch(':username')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    update(
        @Param('username') username: string,
        @Body() updateTemplateDto: UpdateTemplateDto,
    ) {
        return this.templateService.update(username, updateTemplateDto);
    }

    @ApiOkResponse({
        type: Boolean,
        example: true,
    })
    @Delete(':username')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessTokenGuard)
    remove(@Param('username') username: string) {
        return this.templateService.remove(username);
    }
}
