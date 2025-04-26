import { RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Filters } from 'libs/decorators/filters.decorator';
import { Observable, throwError } from 'rxjs';

@Filters(RpcException)
export class AllRpcExceptionsFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException): Observable<unknown> {
        const error = exception.getError();
        const errorResponse = {
            status: false,
            statusCode: 500,
            error: typeof error === 'string' ? error : 'Internal server error',
            timestamp: new Date().toISOString(),
        };

        if (typeof error === 'object' && error !== null) {
            return throwError(() => ({
                ...errorResponse,
                statusCode: error['statusCode'] || errorResponse.statusCode,
                error: error['error'] || errorResponse.error,
            }));
        }

        return throwError(() => errorResponse);
    }
}
