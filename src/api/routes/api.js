import formatter from 'middleware/router/formatter.middleware';

import router from 'koa-joi-router';
import sample from './sample.router';

const { Joi } = router;
const mainRouter = router();

mainRouter.route({
  method: ['POST', 'PUT', 'GET', 'DELETE'],
  path: '*',
  handler: [formatter()],
});

mainRouter.route(sample(Joi));

export default mainRouter;
