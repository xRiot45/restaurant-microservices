import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleDto } from 'libs/dtos/roles-dto/create-role.dto';
import { RoleResponse } from 'libs/dtos/roles-dto/role.dto';
import { RolesService } from './roles.service';

@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @MessagePattern({ cmd: 'create-role' })
    async create(@Payload() payload: CreateRoleDto): Promise<RoleResponse> {
        return await this.rolesService.create(payload);
    }
}
