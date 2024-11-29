// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccessControl {
    
    // 字符串到角色哈希值的映射
    mapping(string => bytes32) private _roleHashes;
    // 角色映射，存储每个地址是否拥有某个角色
    mapping(bytes32 => mapping(address => bool)) private _roles;
    
    // 默认管理员角色
    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;
    
    // 事件：角色分配
    event RoleGranted(string indexed role, address indexed account, address indexed sender);
    
    // 事件：角色撤销
    event RoleRevoked(string indexed role, address indexed account, address indexed sender);
    
    // 只有指定角色的用户才能执行某个函数
    modifier onlyRole(string memory role) {
        bytes32 roleHash = _roleHashes[role];
        require(_roles[roleHash][msg.sender], "AccessControl: sender does not have the role");
        _;
    }
    

    // 构造函数：初始化管理员角色
    constructor() {
        // 管理员角色
        _roles[DEFAULT_ADMIN_ROLE][msg.sender] = true;
        _roleHashes["DEFAULT_ADMIN_ROLE"] = DEFAULT_ADMIN_ROLE;
        emit RoleGranted("DEFAULT_ADMIN_ROLE", msg.sender, msg.sender);
    }

    // 将字符串角色与其 `bytes32` 值进行绑定
    function setRole(string memory roleName) public {
        // 将字符串转换为 `bytes32` 哈希值
        bytes32 roleHash = keccak256(abi.encodePacked(roleName));
        _roleHashes[roleName] = roleHash;
    }

    // 分配角色给指定地址
    function grantRole(string memory roleName, address account) public onlyRole("DEFAULT_ADMIN_ROLE") {
        require(account != address(0), "AccessControl: account is the zero address");
        bytes32 roleHash = _roleHashes[roleName];
        _roles[roleHash][account] = true;
        emit RoleGranted(roleName, account, msg.sender);
    }

    // 撤销角色
    function revokeRole(string memory roleName, address account) public onlyRole("DEFAULT_ADMIN_ROLE") {
        require(account != address(0), "AccessControl: account is the zero address");
        bytes32 roleHash = _roleHashes[roleName];
        _roles[roleHash][account] = false;
        emit RoleRevoked(roleName, account, msg.sender);
    }

    // 查询某个账户是否拥有指定角色
    function hasRole(string memory roleName, address account) public view returns (bool) {
        bytes32 roleHash = _roleHashes[roleName];
        return _roles[roleHash][account];
    }
    receive() external payable {}
}
