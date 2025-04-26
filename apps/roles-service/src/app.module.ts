import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './apps/roles/roles.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/roles-service/.env',
        }),
        DatabaseModule,
        RolesModule,
    ],
})
export class AppModule {}
