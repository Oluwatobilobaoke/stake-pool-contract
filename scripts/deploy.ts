import { ethers } from "hardhat";

async function main() {
  const initialOwner = "0x6694c714e3Be435Ad1e660C37Ea78351092b0075";
  const erc20Contract = await ethers.deployContract("ERC20Token", [
    initialOwner,
    "JARA",
    "JR",
  ]);

  await erc20Contract.waitForDeployment();

  console.log(`ERC20 Token contract deployed to ${erc20Contract.target}`);

  const stakePool = await ethers.deployContract("StakePool", [
    erc20Contract.target,
  ]);

  await stakePool.waitForDeployment();

  console.log(`Stake Pool contract deployed to ${stakePool.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.ts --network sepolia
// ERC20 Token contract deployed to 0x0F9BF4288C701714c01993b378d5d981A956f232
// npx hardhat verify --network sepolia 0x0F9BF4288C701714c01993b378d5d981A956f232 0x6694c714e3Be435Ad1e660C37Ea78351092b0075 JARA JR

// StakePool contract deployed to 0xd466eD0B10d5008C39f71eE11B0d746ea3ABaF20
// npx hardhat verify --network sepolia 0xd466eD0B10d5008C39f71eE11B0d746ea3ABaF20 0x0F9BF4288C701714c01993b378d5d981A956f232

// npx hardhat test
