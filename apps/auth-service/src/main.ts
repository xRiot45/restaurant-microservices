import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3002,
        },
    });

    // app.useGlobalFilters(new AllRpcExceptionsFilter());
    await app.listen();
}
bootstrap();
