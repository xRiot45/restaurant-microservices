import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { RpcErrorResponse } from 'libs/types/error';

export function mapRpcToHttpException(error: unknown): HttpException {
    const err = error as RpcErrorResponse;
    const response = err?.response;

    if (response && response.statusCode) {
        return new HttpException(response.message, response.statusCode);
    }

    return new InternalServerErrorException('Internal server error');
}
