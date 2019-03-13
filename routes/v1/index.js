'use strict';

const v1 = require('express').Router();

const router = require('../router');
const scanner = require('../scanner');

module.exports = app => {
  const routes = scanner(__dirname)
  v1.use('/', router(routes, app));
  return v1;
};
