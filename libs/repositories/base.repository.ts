import { DataSource, EntityTarget, Repository as TypeOrmRepository } from 'typeorm';

export class BaseRepository<T extends object> extends TypeOrmRepository<T> {
    constructor(entity: EntityTarget<T>, dataSource: DataSource) {
        super(entity, dataSource.createEntityManager());
    }
}
