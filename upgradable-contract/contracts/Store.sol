// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.4;

contract Store {
    uint256 private _number1;
    uint256 private _number2;

    // set the numbers
    function setNumbers(uint256 number1_, uint256 number2_) public {
        _number1 = number1_;
        _number2 = number2_;
    }

    // get the numbers
    function getNumbers() public view returns (uint256, uint256) {
        return (_number1, _number2);
    }
}
