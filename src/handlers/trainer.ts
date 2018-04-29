import { Context } from 'koa';

import { ValidationError, AuthenticationError, BadRequestError, CustomError } from '../lib/errors';
import * as jwt from '../lib/jwt';
import logger from '../lib/logger';

import * as trainerAvailabilityService from '../services/trainer-availability';

export async function getAvailability(ctx: Context, next: Function) {
    const query = ctx.query;

    try {
        const result = await trainerAvailabilityService.generateAvailableConsultations(
            ctx.params.trainerId, 
            ctx.query.from_date, 
            ctx.query.to_date
        );

        ctx.response.status = Object.keys(result).length ? 200 : 204;
        ctx.response.body = result;
    }
    catch(error) {
        throw new Error(error);
    }
}
