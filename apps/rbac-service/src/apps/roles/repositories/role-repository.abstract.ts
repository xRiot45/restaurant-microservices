import { BaseRepository } from 'libs/repositories/base.repository';
import { RoleEntity } from '../entities/role.entity';

export abstract class RoleRepository extends BaseRepository<RoleEntity> {
    abstract findByName(name: string): Promise<RoleEntity | null>;
}
