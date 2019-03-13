'use strict';

const router = require('express').Router();

const dispatcher = require('./dispatcher');
const scanner = require('./scanner');

module.exports = (app, dir) => {
  scanner(dir).forEach(route => {
    dispatcher(router, route(app));
  });

  return router;
};
