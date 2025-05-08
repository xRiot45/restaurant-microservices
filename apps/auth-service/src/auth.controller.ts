import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto, RegisterResponse } from 'libs/dtos/auth-dto/auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({ cmd: 'register-user' })
    async register(@Payload() dto: RegisterDto): Promise<RegisterResponse> {
        return await this.authService.register(dto);
    }
}
