import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role-repository.abstract';
import { RoleRepositoryImpl } from './repositories/role-repository.impl';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    providers: [
        RolesService,
        {
            provide: RoleRepository,
            useClass: RoleRepositoryImpl,
        },
    ],
    controllers: [RolesController],
})
export class RolesModule {}
