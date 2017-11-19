import { Context } from 'koa';
import { logger } from '../lib/logger'

export function errorHandler() {
    return async function (ctx: Context, next: Function) {
        try {
            await next();
        }
        catch (error) {
            ctx.response.status = error.status || 500;
            if (ctx.status === 500) {
                logger.error(error.stack);
            } else {
                ctx.body = error.errors;
                logger.debug(error.stack);
            }
        }
    }
}   
