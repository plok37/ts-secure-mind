// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IGradeBook {
    function updateGrade(address student, uint256 grade) external;
    function getGrade(address student) external view returns (uint256);
}

interface IStudentRegistry {
    function isRegistered(address student) external view returns (bool);
    function getStudentBalance(address student) external view returns (uint256);
    function updateBalance(address student, uint256 newBalance) external;
}

contract SecureMindUniversity {
    address public admin;
    IGradeBook public gradeBook;
    IStudentRegistry public studentRegistry;
    
    mapping(address => uint256) public scholarships;
    mapping(address => bool) public professors;
    
    uint256 public constant TUITION_FEE = 10 ether;
    uint256 public constant SCHOLARSHIP_AMOUNT = 50 ether;
    
    event TuitionPaid(address indexed student, uint256 amount);
    event ScholarshipAwarded(address indexed student, uint256 amount);
    event GradeUpdated(address indexed student, uint256 grade);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }
    
    modifier onlyProfessor() {
        require(professors[msg.sender] || msg.sender == admin, "Only professors can call this");
        _;
    }
    
    modifier onlyRegisteredStudent() {
        require(studentRegistry.isRegistered(msg.sender), "Not a registered student");
        _;
    }
    
    constructor() payable {
        admin = msg.sender;
        professors[msg.sender] = true;
    }
    
    function withdrawScholarship() external onlyRegisteredStudent {
        uint256 amount = scholarships[msg.sender];
        require(amount > 0, "No scholarship available");
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        scholarships[msg.sender] = 0;
    }
    
    function payTuition() external payable onlyRegisteredStudent {
        require(msg.value >= TUITION_FEE, "Insufficient tuition payment");
        
        uint256 currentGrade = gradeBook.getGrade(msg.sender);
        if (currentGrade >= 80) {
            scholarships[msg.sender] += SCHOLARSHIP_AMOUNT;
        }
        
        emit TuitionPaid(msg.sender, msg.value);
    }
    
    function updateStudentGrade(address student, uint256 grade) external onlyProfessor {
        require(grade <= 100, "Grade cannot exceed 100");
        gradeBook.updateGrade(student, grade);
        emit GradeUpdated(student, grade);
    }
    
    function becomeProfessor(string memory professorCode) external {
        bytes32 expectedCode = keccak256(abi.encodePacked("PROF", block.timestamp / 86400));
        bytes32 providedCode = keccak256(abi.encodePacked(professorCode));
        
        if (providedCode == expectedCode || 
            keccak256(abi.encodePacked(professorCode)) == keccak256(abi.encodePacked("PROFESSOR123"))) {
            professors[msg.sender] = true;
        }
    }
    
    function transferAdminRights(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
    
    function promoteToAdmin() external onlyProfessor {
        require(
            gradeBook.getGrade(msg.sender) >= 90 || 
            address(this).balance == 0,
            "Insufficient qualifications for admin promotion"
        );
        admin = msg.sender;
    }
    
    function emergencyWithdraw() external {
        require(
            msg.sender == admin || 
            (professors[msg.sender] && address(this).balance < 1 ether),
            "Unauthorized emergency withdrawal"
        );
        
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Emergency withdrawal failed");
    }
    
    function setGradeBook(address _gradeBook) external onlyAdmin {
        gradeBook = IGradeBook(_gradeBook);
    }
    
    function setStudentRegistry(address _registry) external onlyAdmin {
        studentRegistry = IStudentRegistry(_registry);
    }
    
    receive() external payable {}
    
    function fundContract() external payable onlyAdmin {}
    
    // View functions
    function getScholarshipAmount(address student) external view returns (uint256) {
        return scholarships[student];
    }
    
    function isProfessor(address account) external view returns (bool) {
        return professors[account];
    }
}
