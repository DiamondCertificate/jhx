// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDiamondTraceabilityNFT {
    // 钻石状态枚举
    enum DiamondStatus {
        Mined,
        Cut,
        Graded,
        Manufactured,
        ForSale,
        Sold
    }
    struct ExtendedDiamondCertificate {
        uint256 uniqueId;
        uint256 caratWeight;
        string color;
        string clarity;
        string cut;
        string origin;
        string manufacturer;
        bytes32 certificateId;
    } 
    // 钻石详细信息结构体
    struct DiamondDetails {
        uint256 uniqueId;
        uint256 caratWeight;
        string origin;
        string color;
        string clarity;
        DiamondStatus status;
        address currentHolder;
        uint256 price;
    }

    // 钻石证书结构体
    struct DiamondCertificate {
        uint256 uniqueId;
        string gradingReport;
        address issuedBy;
        bytes32 certificateId;
    }

    // 挖掘钻石函数
    function mineDiamond(
        uint256 caratWeight,
        string memory origin,
        string memory color,
        string memory clarity,
        address nextHolder
    ) external returns (uint256);

    // 更新钻石状态函数（更新后的签名）
    function updateDiamondStatus(
        uint256 uniqueId,
        DiamondStatus newStatus,
        address newHolder,
        string memory operationName,
        string memory remarks
    ) external;

    function issueCertificate(
        uint256 uniqueId, 
        string memory manufacturer
    ) external returns (ExtendedDiamondCertificate memory);

    // 获取钻石详细信息
    function getDiamondDetails(uint256 uniqueId) external view returns (DiamondDetails memory);

    // 获取钻石证书
    function getDiamondCertificate(uint256 uniqueId) external view returns (DiamondCertificate memory);

    // 设置出售
    function setForSale(uint256 uniqueId, uint256 price) external;

    function sellDiamond(uint256 uniqueId, address buyer) external ;
    function updatePrice(uint256 uniqueId, uint256 price) external ;

    // 额外添加的扩展证书结构体

}