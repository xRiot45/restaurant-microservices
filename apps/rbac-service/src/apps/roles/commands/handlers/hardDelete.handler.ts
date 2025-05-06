import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { DeleteResponse } from 'libs/types';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { HardDeleteRoleCommand } from './../impl/hardDelete.command';

@CommandHandler(HardDeleteRoleCommand)
export class HardDeleteRoleHandler implements ICommandHandler<HardDeleteRoleCommand> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(command: HardDeleteRoleCommand): Promise<DeleteResponse> {
        const { roleId } = command;
        const role: RoleEntity = await this.roleRepository.findOne(roleId);
        if (!role) {
            throw new RpcException(new NotFoundException('Role not found!'));
        }

        await this.roleRepository.hardDelete(roleId);
        return {
            status: true,
        };
    }
}
