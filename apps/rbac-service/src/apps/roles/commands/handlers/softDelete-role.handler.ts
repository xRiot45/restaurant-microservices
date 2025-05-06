import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { SoftDeleteRoleCommand } from '../impl/softDelete-role.command';

@CommandHandler(SoftDeleteRoleCommand)
export class SoftDeleteRoleHandler implements ICommandHandler<SoftDeleteRoleCommand> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(command: SoftDeleteRoleCommand): Promise<any> {
        const { roleId } = command;
        const role: RoleEntity = await this.roleRepository.findOne(roleId);
        if (!role) {
            throw new RpcException(new NotFoundException('Role not found!'));
        }

        await this.roleRepository.softDelete(roleId);
        return {
            status: true,
        };
    }
}
