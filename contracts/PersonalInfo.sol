// contracts/PersonalInfo.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PersonalInfo is ERC20, AccessControl {

    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE98765");
    
    // Record count
    uint public recordCount = 0;

    struct Record {
        uint id;
        uint SpO2; // blood oxygenation
        uint HR; // heart rate
        address owner; // owner's address
        uint256 timestamp;
    }

    // List of records
    mapping(uint => Record) public records;

    constructor() public ERC20("MyToken", "TKN") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PATIENT_ROLE, msg.sender);
    }

    // Return `true` if the account belongs to the admin role.
    function isAdmin(address account) public virtual view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    // Return `true` if the account belongs to the patient role.
    function isPatient(address account) public virtual view returns (bool) {
        return hasRole(PATIENT_ROLE, account);
    }

    // Restricted to members of the admin role.
    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Restricted to admins.");
        _;
    }

    // Restricted to members of the patient role.
    modifier onlyPatient() {
        require(isPatient(msg.sender), "Restricted to patient.");
        _;
    }

    // Add an account to the user role. Restricted to admins.
    function addPatient(address account) public virtual onlyAdmin {
        grantRole(PATIENT_ROLE, account);
    }

    // Add an account to the admin role. Restricted to admins.
    function addAdmin(address account) public virtual onlyAdmin {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    // Remove an account from the patient role. Restricted to admins.
    function removePatient(address account) public virtual onlyAdmin {
        revokeRole(PATIENT_ROLE, account);
    }
  
    // Remove oneself from the admin role.
    function renounceAdmin() public virtual {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Insert a record in the list
    function createRecord(uint _spO2, uint _hr) public virtual onlyPatient {
        recordCount++;
        records[recordCount] = Record(recordCount, _spO2, _hr, msg.sender, block.timestamp);
    }

    // Read a record from the list
    function getRecord(uint _id) public returns (uint, uint, uint, address, uint256) {
        Record memory currentRecord = records[_id];
        return (currentRecord.id, currentRecord.SpO2, currentRecord.HR, currentRecord.owner, currentRecord.timestamp);
    }
}