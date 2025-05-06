import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { RestoreDataRoleCommand } from '../impl/restoreData.command';

@CommandHandler(RestoreDataRoleCommand)
export class RestoreDataRoleHandler implements ICommandHandler<RestoreDataRoleCommand> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(command: RestoreDataRoleCommand): Promise<RoleResponse> {
        const { roleId } = command;
        const role: RoleEntity = await this.roleRepository.findDataWithDeleted(roleId);
        if (!role) {
            throw new RpcException(new NotFoundException('Role not found!'));
        }

        await this.roleRepository.restore(roleId);
        return role;
    }
}
