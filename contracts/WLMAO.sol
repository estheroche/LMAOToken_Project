// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WWlmao is ERC20 {
    IERC20 LmaoToken;

    //address = 0x8d825EFA26bDCA39f9EB7aD498C7d2C7d58f747d
    constructor() ERC20("Wlmao", "WLO") {
        LmaoToken = IERC20(LmaoToken);
    }

    function depositLmao(address addr, uint _amount) public {
        LmaoToken.transferFrom(msg.sender, address(this), _amount);
        uint calculatAmount = (92 * _amount) / 100;
        _mint(msg.sender, calculatAmount);
    }

    function Withdraw(uint _amount) public {
        require(balanceOf(msg.sender) >= _amount, "not enough");
        _burn(msg.sender, _amount);
    }
}
