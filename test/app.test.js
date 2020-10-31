import request from 'supertest';
import SampleError from '../src/error/sample.error';

const app = require('../app');

test('Hello world works', async () => {
  const response = await request(app.callback())
    .get('/')
    .set({ Accept: 'application/json' })
    .set({ 'Content-Type': 'application/json' });
  expect(response.status).toBe(200);
  expect(response.body.data.a).toMatchSnapshot();
});

test('404 works', async () => {
  const response = await request(app.callback())
    .get('/not-exist');
  expect(response.status).toBe(404);
  expect(response.body.data.a).toMatchSnapshot();
});

test('Check auth works', async () => {
  const response = await request(app.callback())
    .get('/on-auth');
  expect(response.status).toBe(401);
  expect(response.body.data.a).toMatchSnapshot();
});

test('Add sample works', async () => {
  const response = await request(app.callback())
    .post('/sample')
    .send({ sample_text: 'john', sample_number: 123 })
    .set({ Accept: 'application/json' })
    .set({ 'Content-Type': 'application/json' });

  expect(response.status).toBe(200);
  expect(response.body.data.a).toMatchSnapshot();
});

test('Add sample throw error!', async () => {
  process.env.NODE_ENV = 'development';
  const response = await request(app.callback())
    .post('/sample')
    .send({ sample_text: 'john', sample_number: '123' })
    .set({ Accept: 'application/json' })
    .set({ 'Content-Type': 'application/json' });

  expect(response.status).toBe(500);
  expect(response.body.data.a).toMatchSnapshot();
});

test('Sample error works!', async () => {
  const t = () => {
    throw new SampleError('Sample message!');
  };
  expect(t).toThrow(SampleError);
});
