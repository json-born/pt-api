import * as Router from 'koa-router';

export const router: Router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {
    text: 'hello world'
  }
});