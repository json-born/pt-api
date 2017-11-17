import { Context } from 'koa';

import {
    ValidationError,
    AuthenticationError,
    BadRequestError
} from '../lib/errors';

import * as userService from '../services/user';

export async function register(ctx: Context, next: Function) {
    delete ctx.request.body.confirm_password;
    let payload: userService.UserPayload = ctx.request.body;
    const trainer: userService.UserPayload = await userService.getTrainer();
    payload.trainer_id = trainer.id;
    const result = await userService.create(payload);
    payload.id = result.shift();
    delete payload.password;
    ctx.response.body = payload;
}

