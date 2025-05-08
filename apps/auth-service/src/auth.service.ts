import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { RegisterDto, RegisterResponse } from 'libs/dtos/auth-dto/auth.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(@Inject('USERS_SERVICE') private readonly clientProxy: ClientProxy) {}

    async register(req: RegisterDto): Promise<RegisterResponse> {
        const hashedPassword = await bcrypt.hash(req.password, 10);

        const newUserPayload = {
            ...req,
            password: hashedPassword,
        };

        return await firstValueFrom(this.clientProxy.send({ cmd: 'create-user' }, newUserPayload));
    }
}
