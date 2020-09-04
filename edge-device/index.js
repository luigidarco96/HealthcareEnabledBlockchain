// Remove in production - it is needed for the use of a self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { URL_SERVER, MY_PRIVATE_KEY, MY_ADDRESS } = require('./config');
const fetch = require('node-fetch');
const EthCrypto = require('eth-crypto');

var getPublicKey = (privateKey) => {
    return EthCrypto.publicKeyByPrivateKey(privateKey);
}

var randomBetween = (min, max) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

var decrypt = async (privateKey, encryptedData) => {
    return message = await EthCrypto.decryptWithPrivateKey(privateKey, encryptedData);
}

var postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

async function main() {
    // Generate PublicKey from the PrivateKey
    const publicKey = getPublicKey(MY_PRIVATE_KEY);

    // Create the transaction body
    const bodyData = {
        publicKey: publicKey,
        address: MY_ADDRESS,
        spo2: randomBetween(70, 100),
        bpm: randomBetween(55, 150)
    }

    // Start the Challenge process       
    postData(URL_SERVER + "/data", bodyData)
        .then(encryptedData => {
            // Decrypt the challenge
            decrypt(MY_PRIVATE_KEY, encryptedData)
                .then(plainData => {
                    // Send the solution
                    postData(URL_SERVER + "/solution", { solution: plainData, address: MY_ADDRESS })
                        .then(data => {
                            console.log(data);
                            console.log("Transaction body:");
                            console.dir(bodyData);
                        })
                })
        })
}

main()