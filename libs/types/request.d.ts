export interface MinimalRequestInfo {
    protocol: string;
    host: string;
    path: string;
    query: Record<string, any>;
}
