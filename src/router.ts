import * as Router from 'koa-router';

import { defaultResponseBody } from './middleware/default-response-body';
import { globalErrorHandler } from './middleware/global-error-handler';

import * as userHandler from './handlers/user';
import validate from './lib/validator';

export const router: Router = new Router();

router.use(globalErrorHandler());

router.post('/user', validate({
    first_name: ['required', 'ERROR_MISSING_FIRST_NAME'],
    last_name: ['required', 'ERROR_MISSING_LAST_NAME'],
    email: ['required', 'isEmail', 'ERROR_INVALID_EMAIL'],
    password: ['required', 'ERROR_MISSING_PASSWORD'],
    confirm_password: ['required', 'equals(password)', 'ERROR_PASSWORD_MISMATCH']
}), userHandler.register);