// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomNumberConsumer is VRFConsumerBase {
    
    uint256 public fee;
    uint256 public randomNumber;
    
    bytes32 internal keyHash;

    constructor(address coordinator_, address token_, bytes32 keyHash_) 
        VRFConsumerBase(coordinator_, token_) {
            keyHash = keyHash_;
            fee = 0.1 * 10 ** 18;
    }

    function requestRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "RandomNumberConsumer: Not enough LINK in this contract - fill in the balance." );
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomNumber = randomness;
    }
}