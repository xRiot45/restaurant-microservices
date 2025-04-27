/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'libs/decorators/repository.decorator';
import { Repository as TypeOrmRepository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepository } from './role-repository.abstract';

@Repository()
export class RoleRepositoryImpl extends RoleRepository {
    constructor(@InjectRepository(RoleEntity) private readonly roleRepository: TypeOrmRepository<RoleEntity>) {
        super();
    }

    async create(data: Partial<RoleEntity>): Promise<RoleEntity> {
        return await this.roleRepository.save(data);
    }

    async findByName(name: string): Promise<RoleEntity | null> {
        return await this.roleRepository.findOneBy({ name });
    }

    findAll(): Promise<RoleEntity[]> {
        throw new Error('Method not implemented.');
    }

    findOne(id: number): Promise<RoleEntity> {
        throw new Error('Method not implemented.');
    }

    update(id: number, data: Partial<RoleEntity>): Promise<RoleEntity> {
        throw new Error('Method not implemented.');
    }

    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
