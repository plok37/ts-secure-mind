// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Starter {
    bool public stage1;
    bool public stage2;
    bool public stage3;
    bool public stage4;
    bytes32 public secretData;

    constructor(bytes32 _secretData){
        secretData = _secretData;
        stage1 = false;
        stage2 = false;
        stage3 = false;
        stage4 = false;
    }

    function completeStage1() public {
        stage1 = true;
    }

    function completeStage2(uint256 value) public {
        require(stage1, "Stage 1 shold be completed first");
        require(value > 0, "Value must be greater than zero");
        stage2 = true;
    }

    function completeStage3(string memory _string) public {
        require(stage2, "Stage 2 should be completed first");
        require(keccak256(abi.encodePacked(_string)) == keccak256(abi.encodePacked("This_stage_3")), "String does not match");
        stage3 = true;
    }

    function completeStage4(bytes32 _secret) public {
        require(stage3, "Stage 3 should be completed first");
        require(_secret == secretData, "Secret data does not match");
        stage4 = true;
    }
}