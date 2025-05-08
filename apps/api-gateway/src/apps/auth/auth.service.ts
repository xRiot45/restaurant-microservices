import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto, RegisterResponse } from 'libs/dtos/auth-dto/auth.dto';
import { mapRpcToHttpException } from 'libs/helpers/rpc-exception.helper';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

    async register(req: RegisterDto): Promise<RegisterResponse> {
        try {
            return await lastValueFrom(this.client.send({ cmd: 'register-user' }, req));
        } catch (error) {
            throw mapRpcToHttpException(error);
        }
    }
}
