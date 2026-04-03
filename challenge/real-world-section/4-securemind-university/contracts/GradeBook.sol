// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract GradeBook {
    address public university;
    mapping(address => uint256) private grades;
    mapping(address => bool) public hasTakenExam;
    
    modifier onlyUniversity() {
        require(msg.sender == university, "Only university can call this");
        _;
    }
    
    constructor(address _university) {
        university = _university;
    }
    
    function updateGrade(address student, uint256 grade) external onlyUniversity {
        require(grade <= 100, "Invalid grade");
        grades[student] = grade;
        hasTakenExam[student] = true;
    }
    
    function submitExamAnswer(uint256 answer) external {
        require(!hasTakenExam[msg.sender], "Already taken exam");
        
        uint256 grade;
        if (answer == 42) {
            grade = 100;
        } else if (answer > 30 && answer < 50) {
            grade = 75;
        } else if (answer > 20 && answer < 35) {
            grade = 60;
        } else {
            grade = 0;
        }
        
        grades[msg.sender] = grade;
        hasTakenExam[msg.sender] = true;
    }
    
    function getGrade(address student) external view returns (uint256) {
        return grades[student];
    }
    
    function setGradeDirectly(address student, uint256 grade) external {
        require(hasTakenExam[msg.sender], "Must take exam first");
        require(grade <= 100, "Invalid grade");
        
        grades[student] = grade;
    }
    
    function hasStudentTakenExam(address student) external view returns (bool) {
        return hasTakenExam[student];
    }
}
