'use strict';

const v1 = require('express').Router();

module.exports = app => {
  v1.use('/', require('./greeting')(app));
  v1.use('/', require('./json')(app));
  return v1;
};
