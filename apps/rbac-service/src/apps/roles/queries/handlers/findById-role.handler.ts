import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RoleEntity } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { FindByIdRoleQuery } from '../impl/findById-role.query';

@QueryHandler(FindByIdRoleQuery)
export class FindByIdRoleHandler implements IQueryHandler<FindByIdRoleQuery> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(query: FindByIdRoleQuery): Promise<RoleResponse> {
        const role: RoleEntity = await this.roleRepository.findOne(query.roleId);
        if (!role) {
            throw new RpcException(new NotFoundException('Role not found!'));
        }

        return role;
    }
}
