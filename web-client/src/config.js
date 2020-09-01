export const PERSONAL_INFO_ADDRESS = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"

export const PERSONAL_INFO_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_spO2",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hr",
        "type": "uint256"
      }
    ],
    "name": "createRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recordCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "records",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "SpO2",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "HR",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const PATIENTS = [
  {
    id: 0,
    name: "Arturo",
    surname: "Lalla",
    public_key: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
  },
  {
    id: 1,
    name: "Giorgio",
    surname: "Tucano",
    public_key: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0"
  },
  {
    id: 2,
    name: "Mauro",
    surname: "Borrazzo",
    public_key: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b"
  },
  {
    id: 3,
    name: "Luigi",
    surname: "D'Arco",
    public_key: "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d"
  },
  {
    id: 4,
    name: "Alister",
    surname: "Houston",
    public_key: "0xd03ea8624C8C5987235048901fB614fDcA89b117"
  },
  {
    id: 5,
    name: "Paddy",
    surname: "Gale",
    public_key: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC"
  },
  {
    id: 6,
    name: "Firat",
    surname: "Ortega",
    public_key: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9"
  },
  {
    id: 7,
    name: "Natalia",
    surname: "Ballard",
    public_key: "0x28a8746e75304c0780E011BEd21C72cD78cd535E"
  },
  {
    id: 8,
    name: "Jerome",
    surname: "Knox",
    public_key: "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E"
  },
  {
    id: 9,
    name: "Ioana",
    surname: "Richards",
    public_key: "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e"
  },
]