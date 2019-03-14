'use strict';

const router = require('express').Router();
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

function getBaseUrl(name) {
  const index = name.lastIndexOf('/');
  if (index === -1) return '';
  return '/' + name.substring(0, index);
}

function dispatch(baseUrl, route) {
  const { method, url, handler } = route;
  const curUrl = baseUrl + url;

  switch (method.toLowerCase()) {
    case 'get':
      router.get(curUrl, handler);
      break;
    case 'post':
      router.post(curUrl, handler);
      break;
    case 'put':
      router.put(curUrl, handler);
      break;
    case 'delete':
      router.delete(curUrl, handler);
      break;
    default:
      break;
  }
}

module.exports = app => {
  const dir = flattenObject(
    requireDir(path.resolve(__dirname, 'routes'), {
      recurse: true,
      filter: function(fullPath) {
        return !fullPath.endsWith('index.js');
      }
    })
  );

  for (let name in dir) {
    dispatch(getBaseUrl(name), dir[name](app));
  }

  return router;
};
