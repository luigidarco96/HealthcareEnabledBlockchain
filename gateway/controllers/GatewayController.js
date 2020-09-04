const { BLOCKCHAIN_URL, CONTRACT_ADDRESS } = require('../config');
const EthCrypto = require('eth-crypto');
var crypto = require("crypto");
const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');
var { tmpUsers } = require('../models/GatewayQueue'); 

var checkInputTransaction = (body) => {
    let parsedInput = {};
    let check = true;
    (body.publicKey !== undefined && body.publicKey !== '') ? parsedInput.publicKey = body.publicKey: check = false;
    (body.address !== undefined && body.address !== '') ? parsedInput.address = body.address : check = false;
    (body.spo2 !== undefined && body.spo2 !== '') ? parsedInput.spo2 = body.spo2 : check = false;
    (body.bpm !== undefined && body.bpm !== '') ? parsedInput.bpm = body.bpm : check = false;

    return check ? parsedInput : {};
}

var checkInputSolution = (body) => {
    let parsedInput = {};
    let check = true;
    (body.solution !== undefined && body.solution !== '') ? parsedInput.solution = body.solution : check = false;
    (body.address !== undefined && body.address !== '') ? parsedInput.address = body.address : check = false;

    return check ? parsedInput : {};
}

var checkEmptyObject = (obj) => {
    return (Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false;
}

var generateRandomChallenge = () => {
    return crypto.randomBytes(30).toString('hex');
}

var encrypt = async (publicKey, message) => {
    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey,
        message
    );
    return encrypted;
}

var storeTmpUser = (challenge, obj) => {
    let new_obj = {
        id: challenge,
        address: obj.address, 
        spo2: obj.spo2,
        bpm: obj.bpm
    }
    tmpUsers.push(new_obj);
}

var getLastTmpUser = (challenge, address) => {
    return tmpUsers.find(obj => {
        return (obj.id === challenge && obj.address === address) ? obj : null
    })
}

var deleteTmpUser = (challenge, address) => {
    let index = tmpUsers.findIndex(obj => {
        return (obj.id === challenge && obj.address === address) ? obj : null
    })
    tmpUsers.splice(index, 1)
}

var compareChallenge = (oldData, newData) => {
    let value = oldData.localeCompare(newData);
    return (value == 0) ? true : false;
}

var sendTransaction = async (obj) => {

    // Connect to network
    const web3 = new Web3(BLOCKCHAIN_URL);

    // Set up a web3 contract
    const loader = setupLoader({ provider: web3 }).web3;
    const contract = loader.fromArtifact('PersonalInfo', CONTRACT_ADDRESS);

    // Generate random values
    const spo2 = obj.spo2
    const bpm = obj.bpm;

    // Execute transaction
    const transaction = await contract.methods.createRecord(spo2, bpm)
        .send({from: obj.address, gas: 1000000, gasPrice: 1e6})
    
    return transaction
}

var returnSuccess = (res, message) => {
    res.json({
        message: message,
        status: true
    })
}

var returnError = (res, message, code) => {
    res.status(code)
    res.json({
        message: message,
        status: false
    })
}

module.exports = {
    startChallenge: async function (req, res) {
        // Parse input
        let parsedInput = checkInputTransaction(req.body);
        if (checkEmptyObject(parsedInput)) throw new Error("Input paramaters invalid");

        // Generate challenge
        var message = await encrypt(parsedInput.publicKey, random = generateRandomChallenge());

        // Store tmp user
        storeTmpUser(random, parsedInput);

        res.json(message);
    },
    handleSolution: function (req, res) {
        // Parse input
        let parsedInput = checkInputSolution(req.body);
        if (checkEmptyObject(parsedInput)) returnError(res, "Input paramaters invalid", 400);

        // Get old challenge
        tmpUser = getLastTmpUser(parsedInput.solution, parsedInput.address);
        if (tmpUser === undefined || tmpUser === null) returnError(res, "Challenge doesn't exist", 400);

        // Compare the challenge generated with the solution received
        if (!compareChallenge(tmpUser.id, parsedInput.solution)) {
            returnError(res, "Invalid challenge solution", 400);
        } else {
            // Delete the tmp user
            deleteTmpUser(parsedInput.solution, parsedInput.address);

            // Send transaction
            sendTransaction(tmpUser)
            .then((result) => {
                returnSuccess(res, "Transaction done!");
            })
            .catch((error) => {
                console.log("Error: " + error);
                returnError(res, "Transaction not executed", 500);
            })
        }
    }
}