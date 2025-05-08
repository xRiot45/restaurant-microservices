import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'libs/decorators/repository.decorator';
import { Repository as TypeOrmRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user-repository.abstract';

@Repository()
export class UserRepositoryImpl extends UserRepository {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: TypeOrmRepository<UserEntity>) {
        super();
    }

    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        return await this.userRepository.save(data);
    }

    findAll(): Promise<UserEntity[]> {
        throw new Error('Method not implemented.');
    }

    findOne(id: number): Promise<UserEntity> {
        console.log(id);
        throw new Error('Method not implemented.');
    }

    update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
        console.log(id);
        console.log(data);
        throw new Error('Method not implemented.');
    }

    softDelete(id: number): Promise<void> {
        console.log(id);
        throw new Error('Method not implemented.');
    }

    hardDelete(id: number): Promise<void> {
        console.log(id);
        throw new Error('Method not implemented.');
    }

    restore(id: number): Promise<void> {
        console.log(id);
        throw new Error('Method not implemented.');
    }
}
