import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Interceptor } from 'libs/decorators/interceptor.decorator';
import { TransformResponse } from 'libs/types';
import { Observable, map } from 'rxjs';

@Interceptor()
export class TransformInterceptor<T = unknown> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<TransformResponse<T>> {
        return next.handle().pipe(
            map(
                (data): TransformResponse<T> => ({
                    status: true,
                    data,
                }),
            ),
        );
    }
}
