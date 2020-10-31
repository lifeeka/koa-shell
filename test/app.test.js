import request from 'supertest';

const app = require('../app');

test('Hello world works', async () => {
  const response = await request(app.callback())
    .get('/')
    .set({ Accept: 'application/json' })
    .set({ 'Content-Type': 'application/json' });
  expect(response.status).toBe(200);
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
