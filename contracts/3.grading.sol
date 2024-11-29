// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IDiamondTraceabilityNFT.sol";

contract GradingLab {
    IDiamondTraceabilityNFT public traceabilityNFT;
    address public owner;
    uint pwd;

    constructor(address _traceabilityNFTAddress) payable {
        traceabilityNFT = IDiamondTraceabilityNFT(_traceabilityNFTAddress);
        owner = msg.sender;
        pwd = 123456;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized: Not the owner");
        _;
    }

    modifier pwdcompare(uint outsidepwd) {
        require(pwd != outsidepwd,"wrong control");
        _;
    }

    function updateDiamondToGraded(uint outsidepwd, uint256 uniqueId, address newHolder
    ,string memory operationName, string memory remarks) external onlyOwner pwdcompare(outsidepwd){
        traceabilityNFT.updateDiamondStatus(uniqueId, IDiamondTraceabilityNFT.DiamondStatus.Graded, newHolder,operationName,remarks);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
        /// 接受以太币转账
    receive() external payable {}
}
