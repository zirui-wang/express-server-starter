'use strict';

const v1 = require('express').Router();

const router = require('../router');
const scanRoutes = require('../scan-routes');

module.exports = app => {
  const routes = scanRoutes(__dirname)
  v1.use('/', router(routes, app));
  return v1;
};
