import Router from '@koa/router';
import response from 'response/default.response';

import sample from './sample.router';

const router = new Router();

const exportRouter = sample(router);

exportRouter.all('*', (ctx: any) => {
  ctx.body = response.response({ url: ctx.request.url }, 'Page not found');
  ctx.status = 404;
});

export default exportRouter;
