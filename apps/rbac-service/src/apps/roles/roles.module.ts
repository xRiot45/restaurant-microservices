import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    providers: [RolesService, RoleRepository],
    controllers: [RolesController],
    exports: [RolesService, RoleRepository],
})
export class RolesModule {}
