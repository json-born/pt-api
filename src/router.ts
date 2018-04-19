import * as Router from 'koa-router';

import { errorHandler } from './middleware/error-handler';

import * as userHandler from './handlers/user';
import * as trainerHandler from './handlers/trainer';

import validate from './middleware/validator';
import isAuthenticated from './middleware/is-authenticated';

export const router: Router = new Router();

router.use(errorHandler());

router.post('/user', validate({
    first_name: ['required', 'ERROR_MISSING_FIRST_NAME'],
    last_name: ['required', 'ERROR_MISSING_LAST_NAME'],
    email: ['required', 'isEmail', 'ERROR_MISSING_INVALID_EMAIL'],
    password: ['required', 'ERROR_MISSING_PASSWORD'],
    confirm_password: ['required', 'equals(password)', 'ERROR_PASSWORD_MISMATCH'],
    trainer_id:['required', 'ERROR_MISSING_TRAINER_ID']
}), userHandler.register);

router.get('/user', isAuthenticated(), userHandler.read);

router.post('/login', validate({
    email: ['required', 'isEmail', 'ERROR_MISSING_INVALID_EMAIL'],
    password: ['required', 'ERROR_MISSING_PASSWORD'],
}), userHandler.login);

router.get('/trainer/:trainerId/availability/', validate({
    email: ['required', 'isEmail', 'ERROR_MISSING_INVALID_EMAIL'],
    password: ['required', 'ERROR_MISSING_PASSWORD'],
}), trainerHandler.readAvailability);
