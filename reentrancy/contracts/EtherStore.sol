// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.7;

contract EtherStore {
    mapping (address => uint256) public balances;

    function getBalance(address _address) public view returns (uint256) {
        return balances[_address];
    }

    function depositEth() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawEth(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "EtherStore: Don't have enough balance.");

        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        require(sent, "EtherStore: Transfer failed.");

        balances[msg.sender] -= _amount;
    }
}