import * as Router from 'koa-router';

export const router: Router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    text: 'hello world'
  }
});