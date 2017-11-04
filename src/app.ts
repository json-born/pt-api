import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as BodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';

import { globalErrorHandler } from './middleware/global-error-handler';
import { router } from './router';

const app = new Koa();

app.use(Logger());
app.use(BodyParser());

app.use(globalErrorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;