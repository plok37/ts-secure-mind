// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract StudentRegistry {
    struct Student {
        string name;
        uint256 balance;
        bool isRegistered;
        uint256 registrationTime;
    }
    
    mapping(address => Student) public students;
    address[] public studentList;
    address public admin;
    
    event StudentRegistered(address indexed student, string name, uint256 balance);
    event BalanceUpdated(address indexed student, uint256 newBalance);
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }
    
    function registerStudent(string memory name, uint256 initialBalance) external {
        require(!students[msg.sender].isRegistered, "Already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        students[msg.sender] = Student({
            name: name,
            balance: initialBalance,
            isRegistered: true,
            registrationTime: block.timestamp
        });
        
        studentList.push(msg.sender);
        emit StudentRegistered(msg.sender, name, initialBalance);
    }
    
    function registerStudentFor(address studentAddress, string memory name, uint256 initialBalance) external {
        require(!students[studentAddress].isRegistered, "Already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        students[studentAddress] = Student({
            name: name,
            balance: initialBalance,
            isRegistered: true,
            registrationTime: block.timestamp
        });
        
        studentList.push(studentAddress);
        emit StudentRegistered(studentAddress, name, initialBalance);
    }
    
    function updateBalance(address student, uint256 newBalance) external {
        require(students[student].isRegistered, "Student not registered");
        students[student].balance = newBalance;
        emit BalanceUpdated(student, newBalance);
    }
    
    function transferBalance(address from, address to, uint256 amount) external {
        require(students[from].isRegistered, "Sender not registered");
        require(students[to].isRegistered, "Recipient not registered");
        require(students[from].balance >= amount, "Insufficient balance");
        
        students[from].balance -= amount;
        students[to].balance += amount;
    }
    
    // View functions
    function isRegistered(address student) external view returns (bool) {
        return students[student].isRegistered;
    }
    
    function getStudentBalance(address student) external view returns (uint256) {
        return students[student].balance;
    }
    
    function getStudentInfo(address student) external view returns (string memory name, uint256 balance, bool registered, uint256 regTime) {
        Student memory s = students[student];
        return (s.name, s.balance, s.isRegistered, s.registrationTime);
    }
    
    function getStudentCount() external view returns (uint256) {
        return studentList.length;
    }
    
    function getStudentAtIndex(uint256 index) external view returns (address) {
        require(index < studentList.length, "Index out of bounds");
        return studentList[index];
    }
    
    // Admin functions
    function setAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
