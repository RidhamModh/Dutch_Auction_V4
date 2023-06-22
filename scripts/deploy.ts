import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import "@nomiclabs/hardhat-ethers";
const { ethers,upgrades,network } = require("hardhat");
import {expect} from 'chai'

const _reservePrice = "100";
const _numBlocksAuctionOpen = 50;
const _offerPriceDecrement = "1";

async function deployDutchAuctionTestFixture() 
  {
    const [owner, firstAcc, secondAcc] = await ethers.getSigners();

    const nftAuctionFactory = await ethers.getContractFactory("MyNFT");
    const nftAuctionContract = await nftAuctionFactory.deploy();
    
    await nftAuctionContract.mintNFT(firstAcc.address);

    const tokenAuctionFactory = await ethers.getContractFactory("ERC20Token");
    const tokenAuctionContract = await tokenAuctionFactory.deploy("1000");

    const auctionFactory = await ethers.getContractFactory("NFTDutchAuction_ERC20Bids");
    const auctionContract = await upgrades.deployProxy(auctionFactory, [tokenAuctionContract.address, nftAuctionContract.address, 1, ethers.utils.parseUnits(_reservePrice, 18), _numBlocksAuctionOpen, ethers.utils.parseUnits(_offerPriceDecrement, 18)], {initializer: 'initialize', kind: 'uups'});

    await nftAuctionContract.connect(firstAcc).approve(auctionContract.address, 1);
    await tokenAuctionContract.connect(owner).increaseAllowance(auctionContract.address, ethers.utils.parseUnits("1010", 18));

    console.log("First Address: "+auctionContract.address);
    const auctionContractUpgrade = await ethers.getContractFactory("NFTDutchAuction_Upgraded");
    const auctionContractUpgradeDeploy = await upgrades.upgradeProxy(auctionContract.address, auctionContractUpgrade, {initializer: '_reinitialize', initializable: true});
    console.log("Second Address: "+auctionContract.address);
    console.log(await auctionContractUpgradeDeploy.currentVersion());


    return { nftAuctionContract, tokenAuctionContract, auctionContract, owner, firstAcc, secondAcc };
  }

  deployDutchAuctionTestFixture();
