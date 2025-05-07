import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../apps/roles/entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: parseInt(configService.get<string>('DB_PORT') ?? '', 10),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                synchronize: true,
                autoLoadEntities: true,
                entities: [RoleEntity],
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
