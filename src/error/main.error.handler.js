import response from 'response/default.response';

export default () => async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ERROR]:', err);
    // eslint-disable-next-line no-console
    console.error(err.name);

    ctx.status = err.status || 500;

    const errorArray = {};
    let message;

    if (process.env.NODE_ENV === 'development') {
      message = err.message;
      if (err.stack) {
        errorArray.trace = err.stack.split('\n').map((errorLine: string) => errorLine.trim());
      }
      errorArray.environment = process.env.NODE_ENV;
    } else {
      message = 'something went wrong';
    }
    ctx.body = response.response(errorArray, message);
  }
};
