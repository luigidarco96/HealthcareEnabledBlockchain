var { startChallenge, handleSolution } = require('../controllers/GatewayController');

module.exports = function(app) {
    app.post('/data', startChallenge);
    app.post('/solution', handleSolution);
}