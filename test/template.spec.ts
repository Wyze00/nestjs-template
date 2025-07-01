import { Test, TestingModule } from '@nestjs/testing';
import {
    HttpException,
    HttpStatus,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { ValidationError } from 'class-validator';
import { ErrorFilter } from 'src/common/filter/error.filter';
import { ResponseInterceptor } from 'src/common/interceptor/response.interceptor';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './util/test.service';
import { TestModule } from './util/test.module';

describe('Template Controller', () => {
    let app: INestApplication<App>;
    let testService: TestService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, TestModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                exceptionFactory: (e: ValidationError[]) => {
                    return new HttpException(
                        e
                            .map((err: ValidationError) => {
                                if (err.constraints) {
                                    return Object.values(err.constraints).join(
                                        ', ',
                                    );
                                }
                                return `Invalid field: ${err.property}`;
                            })
                            .join(', '),
                        HttpStatus.BAD_REQUEST,
                    );
                },
            }),
        );

        const loggerInstance: Logger = app.get(WINSTON_MODULE_PROVIDER);

        app.useGlobalFilters(new ErrorFilter(loggerInstance));

        app.useGlobalInterceptors(new ResponseInterceptor(loggerInstance));

        testService = app.get(TestService);
        await app.init();
    });

    describe('POST /template', () => {
        afterEach(async () => {
            await testService.removeTemplate();
        });

        it('should success', async () => {
            const response = await request(app.getHttpServer())
                .post('/template')
                .send({
                    username: 'dummy1',
                });

            console.log(response.body);
        });
    });

    describe('GET /template/:username', () => {
        afterEach(async () => {
            await testService.removeTemplate();
        });

        beforeEach(async () => {
            await testService.createTemplate();
        });

        it('should success', async () => {
            const response = await request(app.getHttpServer()).get(
                '/template/dummy1',
            );

            console.log(response.body);
        });
    });
});
