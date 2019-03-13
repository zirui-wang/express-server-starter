'use strict';

const v1 = require('express').Router();

const router = require('../router');

module.exports = app => {
  const routes = [require('./greeting'), require('./json')];
  v1.use('/', router(routes, app));
  return v1;
};
