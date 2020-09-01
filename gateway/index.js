var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

//Routes
var routes = require('./routes/GatewayRoutes');
routes(app);

app.listen(port);

console.log('Gateway started on: ' + port);
