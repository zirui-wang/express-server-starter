'use strict';

const router = require('express').Router();

module.exports = app => {
  router.get('/json', (req, res) => {
    const data = {
      country: 'France',
      age: 18
    };
    res.json(data);
  });
  return router;
};
