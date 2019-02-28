const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use(proxy('/json/', { target: 'HTTP://localhost:3001/' 
    }));
};