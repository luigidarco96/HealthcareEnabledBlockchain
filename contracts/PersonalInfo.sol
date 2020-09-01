// contracts/PersonalInfo.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PersonalInfo is ERC20, AccessControl {

    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE123456");
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE98765");

    constructor(address root_doctor, address root_patient) public ERC20("MyToken", "TKN") {
        _setupRole(DOCTOR_ROLE, root_doctor);
        _setupRole(PATIENT_ROLE, root_patient);
    } 

    uint public recordCount = 0;

    struct Record {
        uint id;
        uint SpO2; // blood oxygenation
        uint HR; // heart rate
        address owner; // owner's address
        uint256 timestamp;
    }

    mapping(uint => Record) public records;

    function createRecord(uint _spO2, uint _hr) public {
        // Require patient role
        require(hasRole(PATIENT_ROLE, msg.sender), "Caller is not a patient");

        recordCount++;
        records[recordCount] = Record(recordCount, _spO2, _hr, msg.sender, block.timestamp);
    }

    function getRecord(uint _id) public returns (uint, uint, uint, address, uint256) {
        // Require doctor role
        require(hasRole(DOCTOR_ROLE, msg.sender), "Caller is not a doctor");

        Record memory currentRecord = records[_id];
        return (currentRecord.id, currentRecord.SpO2, currentRecord.HR, currentRecord.owner, currentRecord.timestamp);
    }

    /*
    function getRecordbyUser(uint _id, address _owner) public returns (uint, uint, uint, address) {
        Record memory currentRecord = records[_id];
        if (currentRecord.owner == _owner) {
            return (currentRecord.id, currentRecord.SpO2, currentRecord.HR, currentRecord.owner);
        }
    }
    */
}