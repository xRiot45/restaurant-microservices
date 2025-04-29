import { ConflictException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Service } from 'libs/decorators/service.decorator';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import buildPaginationLink from 'libs/helpers/build-pagination-link.helper';
import type { PaginatedResponse, PaginationQuery } from 'libs/types/pagination';
import type { MinimalRequestInfo } from 'libs/types/request';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role-repository.abstract';

@Service()
export class RolesService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async create(payload: CreateRoleDto): Promise<RoleResponse> {
        const { name, isActive }: CreateRoleDto = payload;
        const existingRole: RoleEntity | null = await this.roleRepository.findByName(name);
        if (existingRole) {
            throw new RpcException(new ConflictException('Role already exists'));
        }

        const roleEntity: RoleEntity = new RoleEntity({ name, isActive });
        return await this.roleRepository.create(roleEntity);
    }

    async findAll(query: PaginationQuery, request: MinimalRequestInfo): Promise<PaginatedResponse<RoleResponse>> {
        const { page, limit, sortBy, search, filter } = query;

        const sortArray = sortBy ? sortBy.split(',') : [];
        const [items, total] = await this.roleRepository.findAllWithPaginate({
            page,
            limit,
            sortBy: sortArray,
            search,
            filter,
        });

        const totalPages = Math.ceil(total / limit);
        const baseUrl = `${request.protocol}://${request.host}${request.path}`;

        return {
            items,
            meta: {
                itemsPerPage: limit,
                totalItems: total,
                currentPage: page,
                totalPages,
                sortBy: sortArray.map((s) => s.split(':') as [string, 'ASC' | 'DESC']),
                search,
                filter,
            },
            links: {
                first: buildPaginationLink({ baseUrl, page: 1, limit, sortBy: sortArray, search, filter }),
                previous: buildPaginationLink({
                    baseUrl,
                    page: Math.max(1, page - 1),
                    limit,
                    sortBy: sortArray,
                    search,
                    filter,
                }),
                current: buildPaginationLink({ baseUrl, page, limit, sortBy: sortArray, search, filter }),
                next: buildPaginationLink({
                    baseUrl,
                    page: Math.min(totalPages, page + 1),
                    limit,
                    sortBy: sortArray,
                    search,
                    filter,
                }),
                last: buildPaginationLink({ baseUrl, page: totalPages, limit, sortBy: sortArray, search, filter }),
            },
        };
    }
}
