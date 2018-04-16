import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as BodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';
import * as helmet from 'koa-helmet';

import { router } from './router';

export const app = new Koa();

if(process.env.NODE_ENV !== 'test') {
    app.use(Logger());
}

app.use(helmet());
app.use(BodyParser());

app.use(router.routes());
app.use(router.allowedMethods());
