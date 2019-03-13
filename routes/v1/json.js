'use strict';

module.exports = app => {
  return {
    method: 'get',
    url: '/json',
    handler: (req, res) => {
      const data = {
        country: 'France',
        age: 18
      };
      res.json(data);
    }
  };
};
