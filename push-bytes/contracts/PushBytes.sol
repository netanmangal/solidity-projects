//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.14;

contract PushBytes {
    mapping(string => bytes) public hash;
    address public owner;

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "PushBytes: Only owner function");
        _;
    }

    function pushData(string calldata _key, bytes calldata _value) public onlyOwner {
        hash[_key] = _value;
    }
}