import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as BodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';

import { router } from './router';
import { globalErrorHandler } from './middleware/global-error-handler';
import { defaultResponseBody } from './middleware/default-response-body';


export const app = new Koa();

app.use(Logger());
app.use(BodyParser());

app.use(globalErrorHandler);
app.use(defaultResponseBody);

app.use(router.routes());
app.use(router.allowedMethods());