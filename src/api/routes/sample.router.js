import shouldAuth from 'middleware/router/auth.middleware';
import response from 'response/default.response';
import SampleService from 'services/sample.service';

export default (router: any) => {
  router.use(['/on-auth'], shouldAuth());

  router.get('hello-world', '/', async (ctx: any) => {
    ctx.body = response.response({ a: 'Hello Koa!', b: 'Created by Lifeeka' }, 'Success message!');
    ctx.status = 200;
  });

  router.get('check-auth', '/on-auth', async (ctx: any) => {
    ctx.body = response.response({ a: 'Passed the auth!' });
    ctx.status = 200;
  });

  router.post('add-sample', '/sample', async (ctx: any) => {
    const sample = new SampleService();

    const { body } = ctx.request;
    const sampleContent = await sample.save(body);

    ctx.body = response.response(sampleContent);
    ctx.status = 200;
  });

  return router;
};
