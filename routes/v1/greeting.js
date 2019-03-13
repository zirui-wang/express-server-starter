'use strict';

const router = require('express').Router();

module.exports = app => {
  router.get('/', (req, res) => {
    res.send('Hello!');
  });
  return router;
}
