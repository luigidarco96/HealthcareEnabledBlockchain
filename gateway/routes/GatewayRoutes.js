var transactionController = require('../controllers/TransactionController');
var sendTransaction = transactionController.sendTransaction;

module.exports = function(app) {
    app.get('/send-data', sendTransaction);
}