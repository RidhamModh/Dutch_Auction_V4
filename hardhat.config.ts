import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";


const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

export default config;