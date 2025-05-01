import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { UpdateRoleDto } from 'libs/dtos/roles-dto/update-role.dto';
import { DeleteResponse } from 'libs/types';
import type { PaginatedResponse, PaginationQuery } from 'libs/types/pagination';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @Version('1')
    async create(@Body() payload: CreateRoleDto): Promise<RoleResponse> {
        return await this.rolesService.create(payload);
    }

    @Get()
    @Version('1')
    async findAll(@Req() req: Request, @Query() query: PaginationQuery): Promise<PaginatedResponse<RoleResponse>> {
        return await this.rolesService.findAll(req, query);
    }

    @Get('/:roleId')
    @Version('1')
    async findById(@Param('roleId') roleId: number): Promise<RoleResponse> {
        return await this.rolesService.findById(roleId);
    }

    @Patch('/:roleId')
    @Version('1')
    async update(@Param('roleId') roleId: number, @Body() payload: UpdateRoleDto): Promise<RoleResponse> {
        return await this.rolesService.update(roleId, payload);
    }

    @Delete('/soft-delete/:roleId')
    @Version('1')
    async softDelete(@Param('roleId') roleId: number): Promise<DeleteResponse> {
        return await this.rolesService.softDelete(roleId);
    }
}
