import { Inject } from '@nestjs/common';
import { Repository } from 'libs/decorators/repository.decorator';
import { BaseRepository } from 'libs/repositories/base.repository';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { IRoleRepository } from './role.repository.interface';

@Repository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity> implements IRoleRepository {
    constructor(@Inject(DataSource) dataSource: DataSource) {
        super(RoleEntity, dataSource);
    }

    public async saveData(role: RoleEntity): Promise<RoleEntity> {
        return this.save(role);
    }

    public async findByName(name: string): Promise<RoleEntity | null> {
        return await this.findOneBy({ name });
    }

    public async findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[RoleEntity[], number]> {
        const { page, limit, sortBy, search, filter } = options;
        const queryBuilder = this.createQueryBuilder('role');

        if (search) {
            queryBuilder.andWhere('role.name LIKE :search', {
                search: `%${search}%`,
            });
        }

        if (filter && Object.keys(filter).length > 0) {
            Object.keys(filter).forEach((key) => {
                queryBuilder.andWhere(`role.${key} = :${key}`, {
                    [key]: filter[key],
                });
            });
        }

        if (sortBy) {
            sortBy.forEach((sort) => {
                const [field, order = 'ASC'] = sort.split(':');
                if (field && order) {
                    queryBuilder.addOrderBy(`role.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
                }
            });
        }

        // Pagination
        queryBuilder.skip((page - 1) * limit).take(limit);
        return await queryBuilder.getManyAndCount();
    }

    public async findById(id: number): Promise<RoleEntity | null> {
        return this.findOneBy({ id });
    }

    public async updateData(id: number, role: RoleEntity): Promise<RoleEntity | null> {
        await this.update(id, role);
        return this.findOneBy({ id });
    }

    public async deleteData(id: number): Promise<void> {
        await this.delete(id);
    }
}
