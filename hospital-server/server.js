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