const { ethers, upgrades } = require("hardhat");

async function main() {
  const V3Staker = await ethers.getContractFactory('UniswapV3Staker');
  const v3Staker =  await V3Staker.deploy(
    "0x4893376342d5d7b3e31d4184c08b265e5ab2a3f6", // Factory
    "0x622e4726a167799826d1e1d150b076a7725f5d81", // Position Manager
    "2592000", // _maxIncentiveStartLeadTime
    "63072000", // _maxIncentiveDuration
  );
  await v3Staker.deployed();
  console.log("V3 Staker deployed to:", v3Staker.address);
  // npx hardhat verify 0xfe0016A63D32af378fed6f0A41D38604818EFBaa --network testnet "0x4893376342d5d7b3e31d4184c08b265e5ab2a3f6" "0x622e4726a167799826d1e1d150b076a7725f5d81" "2592000" "63072000"
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
