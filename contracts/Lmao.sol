// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LmaoToken is ERC20 {
    address owner;

    //  address = 0x18ca7B243b1f315BBeC55e98C516C1Ce30dcBf87

    constructor() ERC20("LMAO", "LMO") {
        owner = msg.sender;
        _mint(owner, 2_000e18);
    }

    function _transfer(
        address from,
        address to,
        uint256 _value
    ) internal virtual override {
        uint chargedBalance = (8 * _value) / 100;
        uint expectedAmount = _value - chargedBalance;
        // address ownerAddr = _msgSender();
        super._transfer(from, to, expectedAmount);
        super._transfer(from, to, chargedBalance);
    }
}
