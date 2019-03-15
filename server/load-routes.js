'use strict';

const path = require('path');
const requireDir = require('require-dir');

function flattenObject(obj) {
  const toReturn = {};

  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) continue;

    if (typeof obj[i] == 'object') {
      const flatObject = flattenObject(obj[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '/' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
}

function getBaseUrl(prefix, name) {
  const index = name.lastIndexOf('/');
  if (index === -1) return prefix;
  return prefix + '/' + name.substring(0, index);
}

function dispatch(app, baseUrl, route) {
  const { method, url, handler } = route;
  const curUrl = baseUrl + url;

  switch (method.toLowerCase()) {
    case 'get':
      app.get(curUrl, handler);
      break;
    case 'post':
      app.post(curUrl, handler);
      break;
    case 'put':
      app.put(curUrl, handler);
      break;
    case 'delete':
      app.delete(curUrl, handler);
      break;
    case 'patch':
      app.patch(curUrl, handler);
    default:
      break;
  }
}

module.exports = config => {
  const { app = {}, root, prefix = '' } = config;

  const dir = flattenObject(
    requireDir(path.resolve(root, 'routes'), {
      recurse: true,
      filter: function(fullPath) {
        return !fullPath.endsWith('index.js');
      }
    })
  );

  for (let name in dir) {
    dispatch(app, getBaseUrl(prefix, name), dir[name](app));
  }
};
