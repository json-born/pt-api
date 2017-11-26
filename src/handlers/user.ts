import { Context } from 'koa';
import { hash, compare } from 'bcrypt';

import { ValidationError, AuthenticationError, BadRequestError, CustomError } from '../lib/errors';
import * as jwt from '../lib/jwt';
import logger from '../lib/logger';

import * as userService from '../services/user';

export async function register(ctx: Context, next: Function) {
    const payload: userService.User = ctx.request.body;
    const trainer: userService.User = await userService.getTrainer();
    
    payload.password = await hash(payload.password, 10);
    payload.trainer_id = trainer.id;
    
    delete payload.confirm_password;
    
    try {
        const result = await userService.create(payload);
        payload.id = result.shift();
        delete payload.password;
        
        ctx.response.status = 201;
        ctx.response.body = payload;
    }
    catch(error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new CustomError(409, 
                'User already exists',
                { email: 'ERROR_EXISTING_EMAIL' },                
            );
        }
    }
}

export async function login(ctx: Context, next: Function) {
    const payload: userService.User = ctx.request.body;
    
    try {
        const user: userService.User = await userService.readOne(payload.email);
        const hash = user ? user.password : '';
        const validPassword = await compare(payload.password, hash);
        
        if (!user || !validPassword) {
            throw new AuthenticationError({
                email: 'ERROR_INVALID_EMAIL',
                password: 'ERROR_INVALID_PASSWORD'
            });
        }
        
        const token = await jwt.generate({
            id: user.id,
            type: user.type
        });

        ctx.response.status = 200;
        ctx.response.body = {
            user_id: user.id,
            token: token
        };
    }
    catch(error) {
        throw error;
    }
}

export async function read(ctx: Context, next: Function) {
    console.log(ctx.state.user);
    ctx.response.status = 200;
}
