import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { TransformInterceptor } from 'libs/interceptors/transform.interceptor';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrapApiGateway() {
    const app = await NestFactory.create(ApiGatewayModule, {
        cors: true,
    });

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.use(cookieParser());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
}

bootstrapApiGateway();
