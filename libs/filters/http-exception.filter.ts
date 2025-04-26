import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Filters } from 'libs/decorators/filters.decorator';

@Filters(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private formatErrorResponse(statusCode: number, message: string, request: Request) {
        return {
            status: false,
            statusCode: statusCode,
            error: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        };
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (
                typeof exceptionResponse === 'object' &&
                exceptionResponse !== null &&
                'message' in exceptionResponse
            ) {
                message = exceptionResponse.message as string;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const errorResponse = this.formatErrorResponse(statusCode, message, request);
        response.status(statusCode).header('Content-Type', 'application/json').json(errorResponse);
    }
}
