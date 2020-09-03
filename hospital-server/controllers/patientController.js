const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const patientModel = require('../models/patientModel.json');

exports.login = (req, res) => {
    const email = req.body.email;

    patientModel.forEach(async (p) => {
        try {
            if(email === p.email) {
                if(await bcrypt.compare(req.body.password, p.password)) {
                    const name = p.name;
                    const user = { name: name, email: email }
                    var privateKey = fs.readFileSync('./hospital-server/keys/private.key');
                    var accessToken = jwt.sign(user, privateKey, { algorithm: 'RS256'});

                    res.json({ accessToken: accessToken });
                } else {
                    console.log('mannagg')
                    res.status(401).send('Wrong username or password')
                }
            }
        } catch (err) {
            res.status(500).send('Server error')
        }
    })
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    var publicKey = fs.readFileSync('./hospital-server/keys/public.key');
    jwt.verify(token, publicKey, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.listPatients = (req, res) => {

}