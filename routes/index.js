'use strict';

const router = require('express').Router();

module.exports = app => {
  router.use('/v1', require('./v1')(app));
  return router;
};
