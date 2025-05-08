import { Injectable } from '@nestjs/common';
import { RegisterDto, RegisterResponse } from 'libs/dtos/auth-dto/auth.dto';
import { UserRepository } from './repositories/user-repository.abstract';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(req: RegisterDto): Promise<RegisterResponse> {
        return await this.userRepository.create(req);
    }
}
