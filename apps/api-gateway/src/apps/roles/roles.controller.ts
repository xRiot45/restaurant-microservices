import { Body, Controller, Post, Version } from '@nestjs/common';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @Version('1')
    async create(@Body() payload: CreateRoleDto): Promise<RoleResponse> {
        return await this.rolesService.create(payload);
    }
}
