import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRoleHandler } from './commands/handlers/create-role.handler';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role-repository.abstract';
import { RoleRepositoryImpl } from './repositories/role-repository.impl';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
    providers: [
        RolesService,
        {
            provide: RoleRepository,
            useClass: RoleRepositoryImpl,
        },
        CreateRoleHandler,
    ],
    controllers: [RolesController],
})
export class RolesModule {}
