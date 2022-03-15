const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a snack', async () => {
    const res = await request(app).post('/api/v1/snacks').send({
      food: 'Chocolate',
      type: 'Candy',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      food: 'Chocolate',
      type: 'Candy',
    });
  });
});
