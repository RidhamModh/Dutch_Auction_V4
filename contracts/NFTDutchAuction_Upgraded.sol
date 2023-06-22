pragma solidity ^0.8.0;

import "./NFTDutchAuction_ERC20Bids.sol";


contract NFTDutchAuction_Upgraded is 
NFTDutchAuction_ERC20Bids{

    function currentVersion() public pure returns(uint)
    {
        return 5;
    }

}