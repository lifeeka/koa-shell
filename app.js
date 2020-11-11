import dotenv from 'dotenv';
import Koa from 'koa';
import errorHandler from 'error/main.error.handler';
import Provider from 'provider';
import Middleware from 'middleware';
import Api from 'api';

const app = new Koa();
dotenv.config();
global.config = require('./config/app').default;

// Providers
Provider();

// Error handling
app.use(errorHandler());

// Middlewares
Middleware(app);

// Routes
Api(app);

module.exports = app;
