import { Context } from 'koa';

import {
    ValidationError,
    AuthenticationError,
    BadRequestError
} from '../lib/errors';

import * as userService from '../services/user';

export async function register(ctx: Context, next: Function) {
    let payload: userService.UserPayload = ctx.request.body;
    const trainer: userService.UserPayload = await userService.getTrainer();
    
    delete payload.confirm_password;
    payload.trainer_id = trainer.id;
    
    try {
        const result = await userService.create(payload);
        delete payload.password;
        payload.id = result.shift();
        ctx.response.body = payload;
    }
    catch(error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new BadRequestError(
                409, 
                'User already exists', 
                { email: 'ERROR_EXISTING_EMAIL'}
            );
        }
    }
}

export async function login(ctx: Context, next: Function) {

    ctx.response.status = 200;
    ctx.response.body = {};

}
