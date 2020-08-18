// src/index.js

const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');

function getAccount() {
    var myArgs = process.argv.slice(2);
    return myArgs[0];
}

async function main() {

    // Set up web3 object, connected to the local development network
    const web3 = new Web3('http://localhost:8545');

    // Set up a web3 contract, representing our deployed Box instance, using the contract loader
    const loader = setupLoader({ provider: web3 }).web3;

    const contract_key = '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab';
    const contract = loader.fromArtifact('PersonalInfo', contract_key);

    // Send a transaction to store() a new value in the Box
    currentAccount = await getAccount();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.createRecord(100, 90)
        .send({ from: accounts[currentAccount], gas: 1000000, gasPrice: 1e6 });
}

main();