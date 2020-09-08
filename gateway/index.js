var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001

const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const key = fs.readFileSync('./gateway/https/server.key');
const cert = fs.readFileSync('./gateway/https/server.cert');

const server = https.createServer({key: key, cert: cert }, app);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//Routes
var routes = require('./routes/GatewayRoutes');
routes(app);

//Handle Error 404
app.use(function(req, res) {
  res.status(404).send("Page not found");
});

server.listen(port, () => {
  console.log('Gateway started on: ' + port)
});
