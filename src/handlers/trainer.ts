import { Context } from 'koa';

import { ValidationError, AuthenticationError, BadRequestError, CustomError } from '../lib/errors';
import * as jwt from '../lib/jwt';
import logger from '../lib/logger';

import * as trainerService from '../services/trainer';

export async function readAvailability(ctx: Context, next: Function) {
    const query = ctx.query;
    
    try {
        const result = trainerService.readAvailability(
            ctx.params.trainerId, 
            ctx.query.from_date, 
            ctx.query.to_date
        );
    }
    catch(error) {
        
    }
}
