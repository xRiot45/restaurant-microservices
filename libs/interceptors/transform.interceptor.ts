import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Interceptor } from 'libs/decorators/interceptor.decorator';
import { TransformResponse } from 'libs/types';
import { Observable, map } from 'rxjs';

interface StatusData {
    status: boolean;
}

@Interceptor()
export class TransformInterceptor<T extends StatusData> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<TransformResponse<T>> {
        return next.handle().pipe(
            map((data): TransformResponse<T> => {
                if (data && data.status !== undefined) {
                    return data;
                }

                return {
                    status: true,
                    data,
                };
            }),
        );
    }
}
