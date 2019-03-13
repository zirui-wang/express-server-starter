'use strict';

module.exports = app => {
  return {
    method: 'get',
    url: '/',
    handler: (req, res) => {
      res.send('Hello!');
    }
  };
};
