'use strict';

module.exports = (router, route) => {
  const { method, url, handler } = route;

  switch (method.toLowerCase()) {
    case 'get':
      router.get(url, handler);
      break;
    case 'post':
      router.post(url, handler);
      break;
    case 'put':
      router.put(url, handler);
      break;
    case 'delete':
      router.delete(url, handler);
      break;
    default:
      break;
  }
};
