import apiRouter from './routes/api';

export default (app: any) => {
  app.use(apiRouter.middleware());
};
