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

    async findAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[RoleEntity[], number]> {
        const { page, limit, sortBy, search, filter } = options;
        const queryBuilder = this.roleRepository.createQueryBuilder('role');

        // Search function by name
        if (search) {
            queryBuilder.andWhere('role.name LIKE :search', {
                search: `%${search}%`,
            });
        }

        // Filter function by field
        if (filter && Object.keys(filter).length > 0) {
            Object.keys(filter).forEach((key) => {
                queryBuilder.andWhere(`role.${key} = :${key}`, { [key]: filter[key] });
            });
        }

        // Sorting function by ASCENDING and DESCENDING
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

    async findOne(id: number): Promise<RoleEntity> {
        return await this.roleRepository.findOneBy({ id });
    }

    async update(id: number, data: Partial<RoleEntity>): Promise<RoleEntity> {
        await this.roleRepository.update(id, data);
        return await this.roleRepository.findOneBy({ id });
    }

    async softDelete(id: number): Promise<void> {
        await this.roleRepository.softDelete(id);
    }

    async hardDelete(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    }

    async restore(id: number): Promise<void> {
        const role: RoleEntity = await this.roleRepository.findOne({
            where: { id },
            withDeleted: true,
        });

        await this.roleRepository.restore(role.id);
    }

    async findDataWithDeleted(id: number): Promise<RoleEntity> {
        return await this.roleRepository.findOne({
            where: { id },
            withDeleted: true,
        });
    }
}
