const { Router } = require('express');
const { getAll, getById } = require('../models/Snack');
const Snack = require('../models/Snack');
const pool = require('../utils/pool');

module.exports = Router()
  // POST /api/v1/snacks
  .post('/', async (req, res) => {
    const snack = await Snack.insert({
      food: req.body.food,
      type: req.body.type,
    });

    res.json(snack);
  })

  .get('/', async (req, res) => {
    try {
      const snackList = await getAll();
      res.json(snackList);
    } catch (error) {
      error;
    }
  })

  .get('/:id', async (req, res) => {
    const snack = await Snack.getById(req.params.id);

    res.json(snack);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const snack = await Snack.updateById(req.params.id, req.body);

      res.json(snack);
    } catch (error) {
      next(error);
    }
  });
