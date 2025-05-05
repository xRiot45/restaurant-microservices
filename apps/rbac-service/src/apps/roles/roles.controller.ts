import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { UpdateRoleDto } from 'libs/dtos/roles-dto/update-role.dto';
import parsePaginationQuery from 'libs/helpers/parse-pagination-query.helper';
import { DeleteResponse } from 'libs/types';
import type { PaginatedResponse, PaginationQuery } from 'libs/types/pagination';
import type { MinimalRequestInfo } from 'libs/types/request';
import { CreateRoleCommand } from './commands/impl/create-role.command';
import { FindAllRoleQuery } from './queries/impl/findAll-role.query';
import { RolesService } from './roles.service';

@Controller()
export class RolesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly rolesService: RolesService,
    ) {}

    @MessagePattern({ cmd: 'create-role' })
    async create(@Payload() payload: CreateRoleDto): Promise<RoleResponse> {
        const { name, isActive } = payload;
        return await this.commandBus.execute(new CreateRoleCommand(name, isActive));
    }

    @MessagePattern({ cmd: 'findAll-role' })
    async findAll(
        @Payload() payload: { query: PaginationQuery; request: MinimalRequestInfo },
    ): Promise<PaginatedResponse<RoleResponse>> {
        const parsedQuery = parsePaginationQuery(payload.request.query);
        const findAllRoleQuery = new FindAllRoleQuery(
            parsedQuery.page,
            parsedQuery.limit,
            [parsedQuery.sortBy],
            parsedQuery.search,
            parsedQuery.filter,
            `${payload.request.protocol}://${payload.request.host}${payload.request.path}`,
        );

        return this.queryBus.execute(findAllRoleQuery);
    }

    @MessagePattern({ cmd: 'findById-role' })
    async findById(@Payload() roleId: number): Promise<RoleResponse> {
        return await this.rolesService.findById(roleId);
    }

    @MessagePattern({ cmd: 'update-role' })
    async update(@Payload() data: { roleId: number; payload: UpdateRoleDto }): Promise<RoleResponse> {
        const { roleId, payload } = data;
        return await this.rolesService.update(roleId, payload);
    }

    @MessagePattern({ cmd: 'softDelete-role' })
    async softDelete(@Payload() roleId: number): Promise<DeleteResponse> {
        return await this.rolesService.softDelete(roleId);
    }

    @MessagePattern({ cmd: 'hardDelete-role' })
    async hardDelete(@Payload() roleId: number): Promise<DeleteResponse> {
        return await this.rolesService.hardDelete(roleId);
    }

    @MessagePattern({ cmd: 'restore-role' })
    async restoreData(@Payload() roleId: number): Promise<RoleResponse> {
        return await this.rolesService.restoreData(roleId);
    }
}
