const { Router } = require('express');
const { getAll } = require('../models/Snack');
const Snack = require('../models/Snack');

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
  });
