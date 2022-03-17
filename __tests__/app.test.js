const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { insert, getById } = require('../lib/models/Snack');

// this is just for the test while we don't have the order model built out
// async function createSnack({food, type}) {
//   const {rows} = await pool.query(
//     'INSERT INTO'
//   )
// }

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

  it('gets all snacks', async () => {
    await insert({ food: 'Chocolate', type: 'Candy' });

    const res = await request(app).get('/api/v1/snacks');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        food: 'Chocolate',
        type: 'Candy',
      },
    ]);
  });

  it('gets a snack by id', async () => {
    const snack = await insert({ food: 'Chocolate', type: 'Candy' });

    const res = await request(app).get(`/api/v1/snacks/${snack.id}`);

    expect(res.body).toEqual(snack);
  });

  it('updates a snack', async () => {
    const snack = await insert({ food: 'Chocolate', type: 'Candy' });

    const res = await request(app)
      .patch(`/api/v1/snacks/${snack.id}`)
      .send({ food: 'Pub Mix', type: 'Salty' });

    const expected = {
      id: expect.any(String),
      food: 'Pub Mix',
      type: 'Salty',
    };

    expect(res.body).toEqual(expected);
    expect(await getById(snack.id)).toEqual(expected);
  });

  it('deletes a snack', async () => {
    const snack = await insert({ food: 'Chocolate', type: 'Candy' });

    const res = await request(app).delete(`/api/v1/snacks/${snack.id}`);

    expect(res.body).toEqual(snack);
    expect(await getById(snack.id)).toBeNull();
  });
});
