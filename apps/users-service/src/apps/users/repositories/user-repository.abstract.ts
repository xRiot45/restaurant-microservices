import { BaseRepository } from 'libs/repositories/base.repository';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository extends BaseRepository<UserEntity> {}
