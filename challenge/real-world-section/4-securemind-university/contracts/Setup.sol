// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SecureMindUniversity } from "./SecureMindUniversity.sol";
import { GradeBook } from "./GradeBook.sol";
import { StudentRegistry } from "./StudentRegistry.sol";

contract Setup {
    SecureMindUniversity public university;
    GradeBook public gradeBook;
    StudentRegistry public registry;
    bool public solved = false;

    constructor() payable {
        university = new SecureMindUniversity{value: 100 ether}();
        gradeBook = new GradeBook(address(university));
        registry = new StudentRegistry();
        
        // Set up the university with the gradebook and registry
        university.setGradeBook(address(gradeBook));
        university.setStudentRegistry(address(registry));
        
        // Register a student with initial funds
        registry.registerStudent("Alice", 1000 ether);
        
        // Fund the university contract for scholarships
        university.fundContract{value: 50 ether}();
    }

    function setSolved() external {
        // Challenge is solved when:
        // 1. Attacker has drained most of the university contract (less than 10% remains)
        // 2. Attacker has manipulated their grade to be 100
        // 3. Attacker has become the admin of the university
        require(address(university).balance <= 15 ether, "Challenge not solved");
        require(gradeBook.getGrade(msg.sender) == 100, "Grade not set to 100");
        require(university.admin() == msg.sender, "Not admin");
        solved = true;
    }

    function isSolved() external view returns (bool) {
        return solved;
    }
}
