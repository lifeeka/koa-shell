const formatterMiddleware = () => async (ctx, next) => {
  const { headers } = ctx;
  ctx.state.authorized = headers['x-anonymous-consumer'] !== 'true';

  if (headers['x-authenticated-userid']) {
    ctx.state.user = JSON.parse(headers['x-authenticated-userid']);
  }

  await next();
};

export default formatterMiddleware;
