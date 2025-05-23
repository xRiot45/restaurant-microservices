import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestLoggerMiddleware } from 'libs/middlewares/request-logger.middleware';
import { AuthModule } from './apps/auth/auth.module';
import { RolesModule } from './apps/roles/roles.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/api-gateway/.env',
        }),
        RolesModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class ApiGatewayModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('/');
    }
}
