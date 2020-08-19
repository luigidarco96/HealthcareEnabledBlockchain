// src/index.js

const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');

function randomBetween(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

async function main() {

    // Set up web3 object, connected to the local development network
    const web3 = new Web3('http://7fd7e66fb949.ngrok.io/');
    //const web3 = new Web3('http://localhost:8545');

    // Set up a web3 contract, representing our deployed Box instance, using the contract loader
    const loader = setupLoader({ provider: web3 }).web3;

    const contract_key = '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab';
    const contract = loader.fromArtifact('PersonalInfo', contract_key);

    // Send a transaction to store() a new value in the Box
    currentAccount = randomBetween(0, 9);// await getAccount();
    const spo2 = randomBetween(55, 110);
    const bpm = randomBetween(50, 150);
    const accounts = await web3.eth.getAccounts();
    await contract.methods.createRecord(spo2, bpm )
        .send({ from: accounts[currentAccount], gas: 1000000, gasPrice: 1e6 });
    
    console.log('{id: '+currentAccount+', spo2: '+spo2+', bpm: '+bpm+'}');
}

main();