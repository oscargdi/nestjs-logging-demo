import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export const TRACE_ID_HEADER = 'X-Trace-ID';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = randomUUID();
    req[TRACE_ID_HEADER] = traceId;
    res.set(TRACE_ID_HEADER, traceId);
    next();
  }
}
