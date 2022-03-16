const res = require('express/lib/response');
const pool = require('../utils/pool');

module.exports = class Snack {
  id;
  food;
  type;

  // gets called when we invoke new Snack()
  constructor(row) {
    this.id = row.id;
    this.food = row.food;
    this.type = row.type;
  }

  static async insert({ food, type }) {
    const { rows } = await pool.query(
      'INSERT INTO snacks(food, type) VALUES ($1, $2) RETURNING *;',
      [food, type]
    );

    return new Snack(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM snacks');

    return rows.map((row) => new Snack(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
            *
        FROM
            snacks
        WHERE 
        id=$1;
        `,
      [id]
    );
    if (!rows[0]) return null;

    return new Snack(rows[0]);
  }
};
