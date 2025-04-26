import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';
import { Middleware } from 'libs/decorators/middleware.decorator';
import { v4 as uuidv4 } from 'uuid';

@Middleware()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);

    private formatLogMessage(
        requestId: string,
        timestamp: string,
        method: string,
        url: string,
        statusCode: number,
        duration: number,
        referer: string | undefined,
        geoLocation: string | string[],
        userAgent: string | undefined,
        ip: string,
    ) {
        const reasonPhrase = getReasonPhrase(statusCode);
        return `[Timestamp ${timestamp}] [RequestID: ${requestId}] [${method}] ${process.env.APP_URL}:${process.env.APP_PORT}${url} - ${statusCode} ${reasonPhrase} - Duration: ${duration}ms - IP: ${ip} - GeoLocation: ${geoLocation} - UserAgent: ${userAgent} - Referer: ${referer}`;
    }

    private logRequest(statusCode: number, logMessage: string) {
        if ([401, 403, 404, 405, 409, 500].includes(statusCode)) {
            this.logger.error(logMessage);
        } else {
            this.logger.log(logMessage);
        }
    }

    use(req: Request, res: Response, next: NextFunction) {
        const requestId = uuidv4();
        req['requestId'] = requestId;

        const start = Date.now();
        const userAgent = req.headers['user-agent'];
        const timestamp = new Date().toISOString();
        const referer = req.headers['referer'] || req.headers['origin'];
        const method = req.method;
        const url = req.originalUrl;
        const ip = req.ip;

        // Optional: Geolocation logging
        const geoLocation = Array.isArray(req.headers['x-forwarded-for'])
            ? req.headers['x-forwarded-for']
            : [req.headers['x-forwarded-for'] || 'Not Found'];

        res.on('finish', () => {
            const duration = Date.now() - start;
            const statusCode = res.statusCode;
            const logMessage = this.formatLogMessage(
                requestId,
                timestamp,
                method,
                url,
                statusCode,
                duration,
                referer,
                geoLocation,
                userAgent,
                ip,
            );
            this.logRequest(statusCode, logMessage);
        });

        next();
    }
}
