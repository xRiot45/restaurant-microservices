import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Service } from 'libs/decorators/service.decorator';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { mapRpcToHttpException } from 'libs/helpers/rpc-exception.helper';
import type { PaginatedResponse, PaginationQuery } from 'libs/types/pagination';
import { lastValueFrom } from 'rxjs';

@Service()
export class RolesService {
    constructor(@Inject('RBAC_SERVICE') private client: ClientProxy) {}

    async create(payload: CreateRoleDto): Promise<RoleResponse> {
        try {
            return await lastValueFrom(this.client.send({ cmd: 'create-role' }, payload));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }

    async findAll(req: Request, query: PaginationQuery): Promise<PaginatedResponse<RoleResponse>> {
        try {
            return await lastValueFrom(
                this.client.send(
                    { cmd: 'findAll-role' },
                    {
                        query,
                        request: {
                            protocol: req.protocol,
                            host: req.get('host'),
                            path: req.path,
                            query: req.query,
                        },
                    },
                ),
            );
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }
}
