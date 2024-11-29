// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IDiamondTraceabilityNFT.sol";
import "./AccessControl.sol";

contract DiamondTraceabilityNFT is IDiamondTraceabilityNFT {
    mapping(uint256 => DiamondDetails) private _diamonds;
    mapping(uint256 => DiamondCertificate) private _certificates;
    mapping(uint256 => DiamondOperation[]) private _diamondOperations;

    struct DiamondOperation {
        string operationName;
        string remarks;
        string date;
    }

    AccessControl public accessControl;

    uint256 private _nextUniqueId = 1;

    // 角色名称存储为字符串
    mapping(DiamondStatus => string) private _statusUpdateRoles;

    // 存储交易
    mapping(uint256 => Transaction) private _transactions;

    struct Transaction {
        uint256 price; // 买家需要支付的价格
        address buyer; // 买家地址
        bool paid; // 是否支付了
    }

    constructor(address payable accessControlAddress) payable {
        accessControl = AccessControl(accessControlAddress);
        // 初始化状态变更角色映射
        _statusUpdateRoles[DiamondStatus.Cut] = "CUTTER_ROLE";
        _statusUpdateRoles[DiamondStatus.Graded] = "GRADER_ROLE";
        _statusUpdateRoles[DiamondStatus.Manufactured] = "MANUFACTURER_ROLE";
        _statusUpdateRoles[DiamondStatus.ForSale] = "SELLER_ROLE";
        _statusUpdateRoles[DiamondStatus.Sold] = "SELLER_ROLE";
    }

    modifier onlyRole(string memory role) {
        require(accessControl.hasRole(role, msg.sender), "Unauthorized: Incorrect role");
        _;
    }

    event DiamondMined(
        uint256 uniqueId,
        address minedBy,
        uint256 caratWeight,
        string origin,
        string color,
        string clarity
    );

    event CertificateIssued(
        uint256 uniqueId,
        address issuedBy,
        bytes32 certificateId
    );

    event PriceUpdated(uint256 uniqueId, uint256 price);
    event DiamondSold(uint256 uniqueId, address buyer, uint256 price);
    event TransactionCancelled(uint256 uniqueId);

    function mineDiamond(
        uint256 caratWeight,
        string memory origin,
        string memory color,
        string memory clarity,
        address nextHolder // 新增参数：指定钻石的下一个持有者
    ) external override onlyRole("MINER_ROLE") returns (uint256) {
        uint256 uniqueId = _nextUniqueId++;
        _diamonds[uniqueId] = DiamondDetails({
            uniqueId: uniqueId,
            caratWeight: caratWeight,
            origin: origin,
            color: color,
            clarity: clarity,
            status: DiamondStatus.Mined,
            currentHolder: nextHolder, // 将钻石的当前持有者设置为指定的 nextHolder
            price: 0 // 默认价格为 0
        });

            _diamondOperations[uniqueId].push(DiamondOperation({
            operationName: "Mining",
            remarks: "Diamond initially mined",
            date: _getCurrentDate()
        }));

        emit DiamondMined(uniqueId, msg.sender, caratWeight, origin, color, clarity);
        return uniqueId;
    }


    // 新增查询钻石价格的函数
    function getDiamondPrice(uint256 uniqueId) external view returns (uint256) {
        return _diamonds[uniqueId].price;
    }

    // 修改 updateDiamondStatus 函数
    function updateDiamondStatus(
        uint256 uniqueId,
        DiamondStatus newStatus,
        address newHolder,
        string memory operationName,  // 新增参数
        string memory remarks         // 新增参数
    ) external override {
        DiamondDetails storage diamond = _diamonds[uniqueId];
        require(diamond.currentHolder == msg.sender, "Unauthorized: Not the current holder");

        string memory role = _statusUpdateRoles[newStatus];
        require(accessControl.hasRole(role, msg.sender), "Unauthorized: Incorrect role for status update");

        diamond.status = newStatus;
        diamond.currentHolder = newHolder;

        // 记录操作
        _diamondOperations[uniqueId].push(DiamondOperation({
            operationName: operationName,
            remarks: remarks,
            date: _getCurrentDate()
        }));
    }

    function issueCertificate(
        uint256 uniqueId, 
        string memory manufacturer
    ) external  returns (ExtendedDiamondCertificate memory) {
        DiamondDetails storage diamond = _diamonds[uniqueId];
        require(diamond.status == DiamondStatus.Manufactured, "Diamond must be manufactured");

        bytes32 certificateId = keccak256(abi.encodePacked(uniqueId, msg.sender, block.timestamp));
        
        _certificates[uniqueId] = DiamondCertificate({
            uniqueId: uniqueId,
            gradingReport: "Report URI",
            issuedBy: msg.sender,
            certificateId: certificateId
        });

        // 记录操作
        _diamondOperations[uniqueId].push(DiamondOperation({
            operationName: "Certificate Issued",
            remarks: string(abi.encodePacked("Manufactured by ", manufacturer)),
            date: _getCurrentDate()
        }));

        return ExtendedDiamondCertificate({
            uniqueId: uniqueId,
            caratWeight: diamond.caratWeight,
            color: diamond.color,
            clarity: diamond.clarity,
            cut: "Excellent", 
            origin: diamond.origin,
            manufacturer: manufacturer,
            certificateId: certificateId
        });
    }

    function getDiamondLifecycle(uint256 uniqueId) external view returns (DiamondOperation[] memory) {
        return _diamondOperations[uniqueId];
    }
    function _getCurrentDate() internal view returns (string memory) {
        // 这是一个简化的日期获取方法，实际使用时需要更精确的时间获取方式
        return string(abi.encodePacked(
            _uint2str(block.timestamp / (24 * 60 * 60 * 365) + 1970), 
            "-", 
            _uint2str((block.timestamp / (24 * 60 * 60 * 30) % 12) + 1), 
            "-", 
            _uint2str((block.timestamp / (24 * 60 * 60)) % 30 + 1)
        ));
    }
    function _uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function _getStatusName(DiamondStatus status) internal pure returns (string memory) {
        if (status == DiamondStatus.Mined) return "Mining";
        if (status == DiamondStatus.Cut) return "Cutting";
        if (status == DiamondStatus.Graded) return "Grading";
        if (status == DiamondStatus.Manufactured) return "Manufacturing";
        if (status == DiamondStatus.ForSale) return "For Sale";
        if (status == DiamondStatus.Sold) return "Sold";
        return "Unknown";
    }

    function getDiamondCertificate(uint256 uniqueId) external view override returns (DiamondCertificate memory) {
        return _certificates[uniqueId];
    }

    function getDiamondDetails(uint256 uniqueId) external view override returns (DiamondDetails memory) {
        return _diamonds[uniqueId];
    }

    function setForSale(uint256 uniqueId, uint256 price) external override onlyRole("SELLER_ROLE") {
        DiamondDetails storage diamond = _diamonds[uniqueId];
        require(diamond.currentHolder == msg.sender, "Unauthorized: Not the current holder");
        require(diamond.status == DiamondStatus.Manufactured, "Diamond not ready for sale");

        diamond.status = DiamondStatus.ForSale;
        diamond.price = price; // 设置价格
    }

    // 支付并完成购买
    function buyDiamond(uint256 uniqueId) external payable {
        DiamondDetails storage diamond = _diamonds[uniqueId];
        require(diamond.status == DiamondStatus.ForSale, "Diamond is not for sale");
        require(diamond.currentHolder != msg.sender, "Cannot buy your own diamond");

        uint256 price = diamond.price;
        require(msg.value >= price, "Insufficient payment");

        // 记录交易
        _transactions[uniqueId] = Transaction({
            price: price,
            buyer: msg.sender,
            paid: true
        });

        uint256 commission = price / 10; // 抽取10%的佣金
        uint256 sellerAmount = price - commission;

        // 将支付的以太币发送给卖家和佣金接收者
        payable(diamond.currentHolder).transfer(sellerAmount);
        payable(accessControl).transfer(commission); // 假设佣金支付给合约的管理者

        // 更新钻石状态
        diamond.currentHolder = msg.sender;
        diamond.status = DiamondStatus.Sold;

        emit DiamondSold(uniqueId, msg.sender, price);
    }

    // 取消交易
    function cancelTransaction(uint256 uniqueId) external {
        Transaction storage txn = _transactions[uniqueId];
        require(txn.buyer == msg.sender, "Unauthorized: Not the buyer");
        require(!txn.paid, "Cannot cancel a paid transaction");

        delete _transactions[uniqueId];

        emit TransactionCancelled(uniqueId);
    }

    // 检查钻石所有权
    function verifyOwnership(uint256 uniqueId) external view returns (address) {
        return _diamonds[uniqueId].currentHolder;
    }

    // 检查购买状态
    function verifyPurchase(uint256 uniqueId, address buyer) external view returns (bool) {
        DiamondDetails memory diamond = _diamonds[uniqueId];
        return diamond.currentHolder == buyer && diamond.status == DiamondStatus.Sold;
    }
    // 完整实现 sellDiamond 函数
    function sellDiamond(uint256 uniqueId, address buyer) external onlyRole("SELLER_ROLE") {
        DiamondDetails storage diamond = _diamonds[uniqueId];
        require(diamond.currentHolder == msg.sender, "Unauthorized: Not the current holder");
        require(diamond.status == DiamondStatus.ForSale, "Diamond is not for sale");

        diamond.currentHolder = buyer;
        diamond.status = DiamondStatus.Sold;
    }

    // 完整实现 updatePrice 函数
    function updatePrice(uint256 uniqueId, uint256 price) external  {
        DiamondDetails storage diamond = _diamonds[uniqueId];
        require(diamond.currentHolder == msg.sender, "Unauthorized: Not the current holder");

        diamond.price = price;
        emit PriceUpdated(uniqueId, price);
    }

    receive() external payable {}
}
