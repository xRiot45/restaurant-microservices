import { Body, Controller, Get, Param, Post, Query, Req, Version } from '@nestjs/common';
import { Request } from 'express';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
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
}
