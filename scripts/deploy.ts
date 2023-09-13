import { ethers } from "hardhat";

async function main() {

// TokenB = B.	0xD6C4A6a1d9A0Ddf25431881a2EBF75609A523882

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const token = await ethers.deployContract("LmaoToken");

  console.log("Token address:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });