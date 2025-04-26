export interface RpcErrorResponse {
    response: {
        message: string | string[];
        error: string;
        statusCode: number;
    };
    status: number;
    message: string;
    name: string;
}
