import { Injectable, Logger, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';
import { Request } from 'express';


@Injectable()
export class ThrottlerLoggerGuard extends ThrottlerGuard {
    private readonly logger = new Logger('ThrottlerLoggerGuard');
            async throwThrottlingException(
                context: ExecutionContext,
                throttlerLimitDetail: ThrottlerLimitDetail
            ): Promise<void> {
                const req = context.switchToHttp().getRequest<Request>();
                const ip = req?.ip || req?.socket?.remoteAddress || 'unknown';
                const url = req?.originalUrl || req?.url || 'unknown';
                this.logger.warn(`Rate limit exceeded: IP=${ip}, URL=${url}, Limit=${throttlerLimitDetail.limit}, TTL=${throttlerLimitDetail.ttl}`);
                await super.throwThrottlingException(context, throttlerLimitDetail);
            }
}
