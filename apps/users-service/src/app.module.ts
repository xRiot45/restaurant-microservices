import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apps/users/users.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/users-service/.env',
        }),
        DatabaseModule,
        UsersModule,
    ],
})
export class AppModule {}
