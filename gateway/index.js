var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000
  
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
var routes = require('./routes/GatewayRoutes');
routes(app);

app.listen(port);

console.log('Gateway started on: ' + port);
