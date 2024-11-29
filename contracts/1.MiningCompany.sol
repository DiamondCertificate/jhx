// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IDiamondTraceabilityNFT.sol";

contract MiningCompany {
    IDiamondTraceabilityNFT public traceabilityNFT;
    address public owner;
    uint pwd;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "MiningCompany: caller is not the owner");
        _;
    }

    constructor(address _traceabilityNFTAddress) payable {
        traceabilityNFT = IDiamondTraceabilityNFT(_traceabilityNFTAddress);
        owner = msg.sender; // 部署者成为所有者
        pwd = 123456;
    }

    modifier pwdcompare(uint outsidepwd) {
        require(pwd != outsidepwd,"wrong control");
        _;
    }

    /// 挖矿功能：仅允许当前合约所有者调用
    function mineDiamond(
        uint outsidepwd,
        uint256 caratWeight,
        string memory origin,
        string memory color,
        string memory clarity,
        address nextHolder
    ) external onlyOwner pwdcompare(outsidepwd) returns (uint256) {
        // 调用 DiamondTraceabilityNFT 的 mineDiamond 函数
        uint256 uniqueId = traceabilityNFT.mineDiamond(caratWeight, origin, color, clarity, nextHolder);
        return uniqueId;
    }

    /// 转移合约所有权
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "MiningCompany: new owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /// 接受以太币转账
    receive() external payable {}
}
