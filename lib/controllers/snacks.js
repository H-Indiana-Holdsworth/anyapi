const { Router } = require('express');
const Snack = require('../models/Snack');

module.exports = Router()
  // POST /api/v1/snacks
  .post('/', async (req, res) => {
    const snack = await Snack.insert({
      food: req.body.food,
      type: req.body.type,
    });

    res.json(snack);
  });
