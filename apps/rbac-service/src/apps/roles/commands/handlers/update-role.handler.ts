import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { UpdateRoleCommand } from '../impl/update-role.command';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(command: UpdateRoleCommand): Promise<RoleResponse> {
        const { roleId, name, isActive } = command;
        const role: RoleEntity = await this.roleRepository.findOne(roleId);
        if (!role) {
            throw new RpcException(new NotFoundException('Role not found!'));
        }

        const existingRole = await this.roleRepository.findByName(name);
        if (existingRole && existingRole.id !== roleId) {
            throw new RpcException(new ConflictException('Role already exists'));
        }

        role.name = name;
        role.isActive = isActive;
        return await this.roleRepository.update(roleId, role);
    }
}
