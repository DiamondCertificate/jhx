// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IDiamondTraceabilityNFT.sol";

contract JewelrySeller {
    IDiamondTraceabilityNFT public traceabilityNFT;
    address public owner;
    uint pwd;

    constructor(address _traceabilityNFTAddress) payable{
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
// 设置钻石为待售状态并更新价格
    function setDiamondForSale(uint outsidepwd, uint256 uniqueId, uint256 price) external onlyOwner pwdcompare(outsidepwd){
        traceabilityNFT.setForSale(uniqueId, price); // 使用 traceabilityNFT 的 setForSale 来标记钻石为待售并设置价格
    }

    // 控制钻石交易过程，完成销售时会转移钻石所有权
    function sellDiamond(uint outsidepwd, uint256 uniqueId, address buyer) external onlyOwner pwdcompare(outsidepwd) {
        traceabilityNFT.sellDiamond(uniqueId, buyer); // 使用 traceabilityNFT 的 sellDiamond 来转移钻石所有权
    }

    // 更新钻石价格
    function updateDiamondPrice(uint outsidepwd, uint256 uniqueId, uint256 newPrice) external onlyOwner pwdcompare(outsidepwd){
        traceabilityNFT.updatePrice(uniqueId, newPrice); // 使用 traceabilityNFT 的 updatePrice 来更新钻石价格
    }

    // 为钻石颁发证书
    function issueDiamondCertificate(uint outsidepwd,uint256 uniqueId, string memory manufacturer) external onlyOwner pwdcompare(outsidepwd){
        traceabilityNFT.issueCertificate(uniqueId,manufacturer); // 使用 traceabilityNFT 的 issueCertificate 来为钻石颁发证书
    }

    // 转移合约所有者
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }

    // 接受以太币转账
    receive() external payable {}
}
