import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Request } from 'express';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import type { PaginationQuery } from 'libs/types/pagination';
import { RolesService } from './roles.service';

@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @MessagePattern({ cmd: 'create-role' })
    async create(@Payload() payload: CreateRoleDto): Promise<RoleResponse> {
        return await this.rolesService.create(payload);
    }

    // }
    @MessagePattern({ cmd: 'findAll-role' })
    async findAll(@Payload() payload: { query: PaginationQuery; request: Request }) {
        const { query, request } = payload;
        const raw = request.query as Record<string, string>;
        const filter: Record<string, string> = {};
        Object.keys(raw).forEach((k) => {
            if (k.startsWith('filter.')) {
                filter[k.split('.')[1]] = raw[k];
            }
        });

        // Rekonstruksi request object
        const fakeRequest = {
            protocol: request.protocol,
            get: (headerName: string) => {
                if (headerName.toLowerCase() === 'host') {
                    return request.host;
                }
                return undefined;
            },
            path: request.path,
            query: request.query,
        } as unknown as Request;

        return await this.rolesService.findAll({ ...query, filter }, fakeRequest);
    }
}
