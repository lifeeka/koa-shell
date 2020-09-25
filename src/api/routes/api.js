import Router from '@koa/router';
import response from 'response/default.response';
import formatter from 'middleware/router/formatter.middleware';

import post from './post.router';
import comment from './comment.router';

let router = new Router();

router.use(formatter(true));

router = comment(router);
const exportRouter = post(router);

exportRouter.all('*', (ctx: any) => {
  ctx.body = response.response({ url: ctx.request.url }, 'Page not found');
  ctx.status = 404;
});

export default exportRouter;
