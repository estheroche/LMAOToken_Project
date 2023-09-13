// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WWlmao is ERC20 {
    IERC20 LmaoToken;

    //address = 0x8d825EFA26bDCA39f9EB7aD498C7d2C7d58f747d
    constructor(address _lmaoAddr) ERC20("Wlmao", "WLO") {
        LmaoToken = IERC20(_lmaoAddr);
    }

    function depositLmao(uint _amount) public {
        bool success = LmaoToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "failed transfer");
        uint calculatAmount = (8 * _amount) / 100;
        uint total = _amount - calculatAmount;
        _mint(msg.sender, total);
    }

    function Withdraw(uint _amount) public {
        require(balanceOf(msg.sender) >= _amount, "not enough");
        _burn(msg.sender, _amount);
        bool success = LmaoToken.transfer(msg.sender, _amount);
        require(success, "failed transfer");
    }
}
