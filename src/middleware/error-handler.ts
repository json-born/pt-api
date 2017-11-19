import { Context } from 'koa';
import { logger } from '../lib/logger'

export function errorHandler() {
    return async function (ctx: Context, next: Function) {
        try {
            await next();
        }
        catch (error) {
            logger.error(error.stack);

            ctx.status = error.status || 500;

            if (ctx.status !== 500) {
                ctx.body = error.errors
            }
        }
    }
}   
