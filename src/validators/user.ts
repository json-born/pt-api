import { Context } from 'koa';
import * as validator from 'validator';

import { UserPayload } from '../services/user';

export function register() {
    return async function validate(ctx: Context, next: Function) {
        const payload: UserPayload = ctx.request.body;
        const valid = validator.equals(payload.password, payload.confirm_password);
        if(!valid) {
            ctx.response.status = 422;
            ctx.response.body = {
                confirm_password: 'ERROR_PASSWORD_MISMATCH'
            }
        } else {
            await next();
        }
    }
}