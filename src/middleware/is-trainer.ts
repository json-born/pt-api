import { Context, Request } from 'koa';

import * as jwt from '../lib/jwt';
import logger  from '../lib/logger';

import { AuthenticationError } from '../lib/errors';

export default function isTrainer() {
    return async (ctx: Context, next: Function) => {
        if(ctx.state.user.type !== 'trainer') {
            throw new AuthenticationError('Invalid token');
        }
        await next();
    }
}
