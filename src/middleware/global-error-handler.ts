import { Context } from 'koa';
import { logger } from '../lib/logger'

export function globalErrorHandler() {
  return async function(ctx: Context, next: Function) {
    try {
        await next();
    } 
    catch(err) {
      logger.error(err.stack);
      ctx.status = err.status || 500;
  
      if (ctx.status !== 500) {
        ctx.body = {
            error: err.message,
            errors: err.errors,
        };
      }
    }
  }
}   