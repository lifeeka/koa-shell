const authMiddleware = () => async (ctx: any, next: any) => {
  if (!ctx.state.authorized) {
    ctx.throw(401, 'Unauthorized');
  }
  await next();
};

export default authMiddleware;
