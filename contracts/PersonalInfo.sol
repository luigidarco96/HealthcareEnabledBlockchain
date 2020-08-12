// contracts/PersonalInfo.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract PersonalInfo {

    uint public recordCount = 0;

    struct Record {
        uint id;
        uint SpO2; // blood oxygenation
        uint HR; // heart rate
        address owner; // owner's address
    }

    mapping(uint => Record) public records;

    function createRecord(uint _spO2, uint _hr) public {
        recordCount++;
        
        records[recordCount] = Record(recordCount, _spO2, _hr, msg.sender);
    }

    function getRecord(uint _id) public returns (uint, uint, uint, address) {
        Record memory currentRecord = records[_id];
        return (currentRecord.id, currentRecord.SpO2, currentRecord.HR, currentRecord.owner);
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