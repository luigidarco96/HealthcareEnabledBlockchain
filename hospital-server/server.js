require('dotenv').config()

const https = require('https'); 
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const key = fs.readFileSync('./hospital-server/https/server.key');
const cert = fs.readFileSync('./hospital-server/https/server.cert');

const server = https.createServer({key: key, cert: cert }, app);

// Add headers
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});*/

//Routes
var routes = require('./routes/patientRoutes');
routes(app);

//Handle Error 404
app.use(function(req, res) {
    res.status(404).send("Page not found");
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}.`)
})