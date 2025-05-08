import { Body, Controller, Post, Version } from '@nestjs/common';
import { RegisterDto, RegisterResponse } from 'libs/dtos/auth-dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @Version('1')
    async register(@Body() payload: RegisterDto): Promise<RegisterResponse> {
        return await this.authService.register(payload);
    }
}
