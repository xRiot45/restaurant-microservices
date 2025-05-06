import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateRoleHandler } from './commands/handlers/create-role.handler';
import { HardDeleteRoleHandler } from './commands/handlers/hardDelete.handler';
import { RestoreDataRoleHandler } from './commands/handlers/restoreData.handler';
import { SoftDeleteRoleHandler } from './commands/handlers/softDelete-role.handler';
import { UpdateRoleHandler } from './commands/handlers/update-role.handler';
import { RoleEntity } from './entities/role.entity';
import { FindAllRoleHandler } from './queries/handlers/findAll-role.handler';
import { FindByIdRoleHandler } from './queries/handlers/findById-role.handler';
import { RoleRepository } from './repositories/role-repository.abstract';
import { RoleRepositoryImpl } from './repositories/role-repository.impl';
import { RolesController } from './roles.controller';

const CommandHandlers = [
    CreateRoleHandler,
    UpdateRoleHandler,
    SoftDeleteRoleHandler,
    HardDeleteRoleHandler,
    RestoreDataRoleHandler,
];

const QueryHandlers = [FindAllRoleHandler, FindByIdRoleHandler];

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
    providers: [
        {
            provide: RoleRepository,
            useClass: RoleRepositoryImpl,
        },
        ...CommandHandlers,
        ...QueryHandlers,
    ],
    controllers: [RolesController],
})
export class RolesModule {}
