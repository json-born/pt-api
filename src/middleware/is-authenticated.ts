import { Context, Request } from 'koa';
import * as jwt from '../lib/jwt';

import logger  from '../lib/logger';
import { AuthenticationError } from '../lib/errors';

export default function isAuthenticated() {
    return async (ctx: Context, next: Function) => {
        let token: string = ctx.request.headers['authorization'] || '';
    
        if(!token) {
            throw new AuthenticationError('Invalid token');
        }
            
        try {
            const decodedToken: Object = await jwt.decode(token);
            ctx.state.user = decodedToken;
        }
        catch (error) {
            throw new AuthenticationError('Invalid token');
        }
        
        await next();
    }
}
