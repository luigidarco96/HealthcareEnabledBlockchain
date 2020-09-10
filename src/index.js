// src/index.js

const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');
const adminAccount = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
const contract_key = '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab';

const defaultPatientAccount = [
    "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0",
    "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
    "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d",
    "0xd03ea8624C8C5987235048901fB614fDcA89b117",
    "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC",
    "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
    "0x28a8746e75304c0780E011BEd21C72cD78cd535E",
    "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E",
    "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e",
]

async function main() {

    // Set up web3 object, connected to the local development network
    const web3 = new Web3('http://localhost:8545');

    // Set up a web3 contract, representing our deployed Box instance, using the contract loader
    const loader = setupLoader({ provider: web3 }).web3;
    const contract = loader.fromArtifact('PersonalInfo', contract_key);

    // Add patient users
    defaultPatientAccount.forEach( async account => {
        await contract.methods.addPatient(account)
            .send({ from: adminAccount, gas: 1000000, gasPrice: 1e6 }) 
            .then(res => {
                console.log("Patient added. Address: " + account);
            })
            .catch(error => {
                console.log("Error: " + error)
            }) 
    });
}

main();