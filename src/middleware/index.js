import json from 'koa-json';
import koaBody from 'koa-body';

export default (app: any) => {
  app.use(json());
  app.use(koaBody({
    multipart: true,
    urlencoded: true,
  }));
};
