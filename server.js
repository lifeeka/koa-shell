import app from './app';

app.listen(process.env.PORT);
// eslint-disable-next-line no-console
console.log(`Koa listening on port ${process.env.PORT}`);
