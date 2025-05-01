export abstract class BaseRepository<T> {
    abstract create(data: Partial<T>): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: number): Promise<T | null>;
    abstract update(id: number, data: Partial<T>): Promise<T>;
    abstract softDelete(id: number): Promise<void>;
    abstract hardDelete(id: number): Promise<void>;
    abstract restore(id: number): Promise<void>;
}
