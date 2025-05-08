import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto, RegisterResponse } from 'libs/dtos/auth-dto/auth.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'create-user' })
    async createUser(@Payload() dto: RegisterDto): Promise<RegisterResponse> {
        return await this.usersService.create(dto);
    }
}
