export type ClassType<T = unknown> = new (...args: unknown[]) => T;

export interface TransformResponse<T = unknown> {
    status: boolean;
    data?: T;
}
