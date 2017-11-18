import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as BodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';

import { router } from './router';

export const app = new Koa();

app.use(Logger());
app.use(BodyParser());

app.use(router.routes());
app.use(router.allowedMethods());