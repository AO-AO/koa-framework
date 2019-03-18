import { Context, Next } from '../routers/routerManager';
import {
    initLogger,
    LogType,
} from '../../drivers/logger';
const logger = initLogger('AccessLogger', LogType.webapps);

export async function responseTime (ctx: Context, next: Next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.info({
        method: ctx.method,
        path: ctx.url,
        body: ctx.body,
        query: ctx.query,
        responseTime: ms,
    });
}
