import { ConflictException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Service } from 'libs/decorators/service.decorator';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Service()
export class RolesService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async create(payload: CreateRoleDto): Promise<RoleResponse> {
        const { name, isActive } = payload;
        const existingRole = await this.roleRepository.findByName(name);
        if (existingRole) {
            throw new RpcException(new ConflictException('Role already exists'));
        }

        const roleEntity = new RoleEntity({ name, isActive });
        return await this.roleRepository.saveData(roleEntity);
    }
}
