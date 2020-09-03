module.exports = function (app) {
    var patientController = require('../controllers/patientController');

    app.get('/', patientController.authenticateToken, (req, res) => {
        res.status(200).json({ info: 'Server is working' });
    })

    app.post('/login', patientController.login);

    app.get('/listPatients', patientController.authenticateToken, patientController.listPatients);
}