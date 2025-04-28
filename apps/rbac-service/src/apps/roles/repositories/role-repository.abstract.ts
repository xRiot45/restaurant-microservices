import { BaseRepository } from 'libs/repositories/base.repository';
import { RoleEntity } from '../entities/role.entity';

export abstract class RoleRepository extends BaseRepository<RoleEntity> {
    abstract findByName(name: string): Promise<RoleEntity | null>;
    abstract findAllWithPaginate(options: {
        page: number;
        limit: number;
        sortBy: string[];
        search: string;
        filter?: { [key: string]: string };
    }): Promise<[RoleEntity[], number]>;
}
