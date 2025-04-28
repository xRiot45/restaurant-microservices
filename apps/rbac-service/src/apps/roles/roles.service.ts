import { ConflictException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { Service } from 'libs/decorators/service.decorator';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import type { PaginatedResponse, PaginationQuery } from 'libs/types/pagination';
import { RoleEntity } from './entities/role.entity';
import { RoleRepository } from './repositories/role-repository.abstract';

@Service()
export class RolesService {
    constructor(private readonly roleRepository: RoleRepository) {}

    /**
     * Create a new role in the database.
     * @param payload The role data to save
     * @returns The saved role data
     */
    async create(payload: CreateRoleDto): Promise<RoleResponse> {
        const { name, isActive }: CreateRoleDto = payload;
        const existingRole: RoleEntity | null = await this.roleRepository.findByName(name);
        if (existingRole) {
            throw new RpcException(new ConflictException('Role already exists'));
        }

        const roleEntity: RoleEntity = new RoleEntity({ name, isActive });
        return await this.roleRepository.create(roleEntity);
    }

    /**
     * Get a list of roles with pagination.
     * @param query The pagination query
     * @param req The express request object
     * @returns A paginated response with the list of roles
     */
    async findAll(query: PaginationQuery, req: Request): Promise<PaginatedResponse<RoleResponse>> {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 10;
        const sortBy = query?.sortBy?.split(',') || [];
        const search = query?.search || '';
        const filter = query?.filter || {};

        const options = { page, limit, sortBy, search, filter };
        const [items, total] = await this.roleRepository.findAllWithPaginate(options);

        const totalPages = Math.ceil(total / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;

        const buildLink = (page: number) => {
            const sortByQuery = sortBy.length ? `&sortBy=${sortBy.join(',')}` : '';
            const searchQuery = search ? `&search=${search}` : '';
            const filterQuery = Object.entries(filter)
                .map(([key, value]) => `&filter.${key}=${value}`)
                .join('');

            return `${baseUrl}?limit=${limit}&page=${page}${sortByQuery}${searchQuery}${filterQuery}`;
        };

        return {
            items,
            meta: {
                itemsPerPage: limit,
                totalItems: total,
                currentPage: page,
                totalPages,
                sortBy: sortBy.map((s) => s.split(':') as [string, 'ASC' | 'DESC']),
                search,
                filter,
            },
            links: {
                first: buildLink(1),
                previous: buildLink(Math.max(1, page - 1)),
                current: buildLink(page),
                next: buildLink(Math.min(totalPages, page + 1)),
                last: buildLink(totalPages),
            },
        };
    }
}
