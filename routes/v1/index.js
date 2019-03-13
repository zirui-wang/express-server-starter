'use strict';

const v1 = require('express').Router();

const router = require('../router');

module.exports = app => {
  v1.use('/', router(app, __dirname));
  return v1;
};
