import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import buildPaginationLink from 'libs/helpers/build-pagination-link.helper';
import { PaginatedResponse } from 'libs/types/pagination';
import { RoleRepository } from '../../repositories/role-repository.abstract';
import { FindAllRoleQuery } from '../impl/findAll-role.query';

@QueryHandler(FindAllRoleQuery)
export class FindAllRoleHandler implements IQueryHandler<FindAllRoleQuery> {
    constructor(private readonly roleRepository: RoleRepository) {}

    async execute(query: FindAllRoleQuery): Promise<PaginatedResponse<RoleResponse>> {
        const { page, limit, sortBy, search, filter, baseUrl } = query;

        const sortArray = sortBy ?? [];
        const [items, total] = await this.roleRepository.findAllWithPaginate({
            page,
            limit,
            sortBy: sortArray,
            search,
            filter,
        });

        const totalPages = Math.ceil(total / limit);

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
