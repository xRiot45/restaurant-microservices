import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { Service } from 'libs/decorators/service.decorator';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { UpdateRoleDto } from 'libs/dtos/roles-dto/update-role.dto';
import { mapRpcToHttpException } from 'libs/helpers/rpc-exception.helper';
import { DeleteResponse } from 'libs/types';
import type { PaginatedResponse, PaginationQuery } from 'libs/types/pagination';
import type { MinimalRequestInfo } from 'libs/types/request';
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
            const minimalReq: MinimalRequestInfo = {
                protocol: req.protocol,
                host: req.get('host'),
                path: req.path,
                query: req.query,
            };

            return await lastValueFrom(this.client.send({ cmd: 'findAll-role' }, { query, request: minimalReq }));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }

    async findById(roleId: number): Promise<RoleResponse> {
        try {
            return await lastValueFrom(this.client.send({ cmd: 'findById-role' }, roleId));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }

    async update(roleId: number, payload: UpdateRoleDto): Promise<RoleResponse> {
        try {
            return await lastValueFrom(this.client.send({ cmd: 'update-role' }, { roleId, payload }));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }

    async softDelete(roleId: number): Promise<DeleteResponse> {
        try {
            return await lastValueFrom(this.client.send({ cmd: 'softDelete-role' }, roleId));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }

    async hardDelete(roleId: number): Promise<DeleteResponse> {
        try {
            return await lastValueFrom(this.client.send({ cmd: 'hardDelete-role' }, roleId));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }
}
