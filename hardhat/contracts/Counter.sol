// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Counter {
    uint256 public count = 0;

    // Function to get the current count
    function get() public view returns (uint256) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        count -= 1;
    }
}
