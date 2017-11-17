import * as Router from 'koa-router';

import { defaultResponseBody } from './middleware/default-response-body';
import { globalErrorHandler } from './middleware/global-error-handler';

import * as userHandler from './handlers/user';
import * as userValidator from './validators/user';

export const router: Router = new Router();

router.use(globalErrorHandler());

router.post('/user', userValidator.register(), userHandler.register);