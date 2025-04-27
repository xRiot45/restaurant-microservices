export abstract class BaseRepository<T> {
    abstract create(data: Partial<T>): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: number): Promise<T | null>;
    abstract update(id: number, data: Partial<T>): Promise<T>;
    abstract delete(id: number): Promise<void>;
}
