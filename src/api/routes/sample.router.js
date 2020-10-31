import shouldAuth from 'middleware/router/auth.middleware';
import response from 'response/default.response';
import SampleService from 'service/sample.service';
import SampleRequest from 'request/sample.request';

export default (router: any) => {
  router.use(['/on-auth'], shouldAuth());
  router.use('/sample', SampleRequest(true));

  router.get('/', async (ctx: any) => {
    ctx.body = response.response({ a: 'Hello Koa!', b: 'Created by Lifeeka' }, 'Success message!');
    ctx.status = 200;
  });

  router.get('check-auth', '/on-auth', async (ctx: any) => {
    ctx.body = response.response({ a: 'Passed the auth!' });
    ctx.status = 200;
  });

  router.post('add-sample', '/sample', async (ctx: any) => {
    const sample = new SampleService();

    const body = ctx.state.request.getAll();
    const sampleContent = await sample.save(body);

    ctx.body = response.response(sampleContent);
    ctx.status = 200;
  });

  return router;
};
