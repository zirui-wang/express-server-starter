'use strict';

const router = require('express').Router();

const dispatcher = require('./dispatcher');

module.exports = (routes, app) => {
  routes.forEach(route => {
    dispatcher(router, route(app));
  });

  return router;
};
