// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { Starter } from "./Starter.sol";

contract Setup {
    Starter public starter;

    constructor(bytes32 _secretData) {
        starter = new Starter(_secretData);
    }

    function isSolved() external view returns (bool) {
        return starter.stage4();
    }
}