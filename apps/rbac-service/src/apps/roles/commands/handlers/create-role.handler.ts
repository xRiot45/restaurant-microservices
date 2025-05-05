import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { CreateRoleCommand } from '../impl/create-role.command';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(command: CreateRoleCommand): Promise<RoleResponse> {
        const { name, isActive } = command;
        const existingRole: RoleEntity | null = await this.roleRepository.findByName(name);
        if (existingRole) {
            throw new RpcException(new ConflictException('Role already exists'));
        }

        const roleEntity: RoleEntity = new RoleEntity({ name, isActive });
        return await this.roleRepository.create(roleEntity);
    }
}
