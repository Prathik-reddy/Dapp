// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract funder{
    uint public numberOfFunders;
    mapping(uint=>address) private funders;

    receive() external payable{}

    function transfer() external payable{
        funders[numberOfFunders] = msg.sender;
    }

    function withDraw(uint withDrawAmt) external{
        require(withDrawAmt<=2000000000000000000,"Cannot withDraw more than 2 ether");
        payable(msg.sender).transfer(withDrawAmt);

    }
}