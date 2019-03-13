'use strict';

const fs = require('fs');
const path = require('path');

module.exports = dir => {
  const routes = [];
  fs.readdirSync(dir).forEach(file => {
    if (file === 'index.js') return;
    routes.push(require(path.resolve(dir, file)));
  });
  return routes;
};
