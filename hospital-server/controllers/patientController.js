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
                    const id = p.id;
                    const user = { id: id, name: name, email: email }
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

    const publicKey = fs.readFileSync('./hospital-server/keys/public.key');
    jwt.verify(token, publicKey, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

exports.listPatients = (req, res) => {
    const publicKey = fs.readFileSync('./hospital-server/keys/public.key');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, publicKey);
    var patients;

    patientModel.forEach((p) => {
        if(p.id === decodedToken.id) {
            patients = p.patients;
        }
    });

    res.json({ patients: patients });
}

exports.addPatient = (req, res) => {
    const publicKey = fs.readFileSync('./hospital-server/keys/public.key');
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, publicKey);

    var id;
    const name = req.body.name;
    const email = req.body.email;
    const key = req.body.publicKey;

    patientModel.forEach(pat => {
        if(decodedToken.id === pat.id) {
            pat.patients.forEach(p => {
                id = p.id;
            })
            id += 1;
            const newPatient = { id: id, name: name, email: email, publicKey: key }
            pat.patients.push(newPatient);
        }
    });

    let data = JSON.stringify(patientModel, null, 2);

    fs.writeFile('./hospital-server/models/patientModel.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    res.status(200).send();
}