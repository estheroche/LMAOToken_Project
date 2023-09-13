import { AddressLike, Typed } from "ethers";
import { ethers, network } from "hardhat";



async function main() {

  const [owner, spender] = await ethers.getSigners();

 const owneraddr = "0xe9999a29B116cB45444621EcD1CE52CA013243E4"

 const LMAOAddr = '0x381313a0ccA2Ae9f9FE50bbB9577E6e930DA15aA'

  // contract addresses
  // const LmaoToken1 = "0x18ca7B243b1f315BBeC55e98C516C1Ce30dcBf87";
  // const WWlmao = "0x8d825EFA26bDCA39f9EB7aD498C7d2C7d58f747d";
 

  // const LmaoToken1Contract = await ethers.getContractAt("LmaoToken", LmaoToken1);
  // const WWlmaoContract = await ethers.getContractAt("TokenB", WWlmao);
 
  const LmaoToken1Contract = await ethers.deployContract("LmaoToken");
  await LmaoToken1Contract.waitForDeployment();
  const WWlmaoContract = await ethers.deployContract("WWlmao", [LmaoToken1Contract.target]);

  await WWlmaoContract.waitForDeployment()
 

  // checking balances before
  const getBalance = async (addr: AddressLike | Typed, message: string) => {
    const lmaoBal =ethers.formatEther(
      await LmaoToken1Contract.balanceOf(addr)
    ); 
    const wlmaoBal =ethers.formatEther(
      await WWlmaoContract.balanceOf(addr)
    );

    console.log({
      message,
      lmaoBal,
      wlmaoBal
    });
    
  }

  await getBalance(owner , "Balance of Owner");

  const value = ethers.parseEther("200");
  


  const transferLtoSpender = await LmaoToken1Contract.connect(owner).transfer(spender, value);

  await getBalance(owner, "owner balance after transferrin Lmao");
  await getBalance(spender, "Spender Balance");

  await LmaoToken1Contract.connect(spender).approve(WWlmaoContract, value);

  await WWlmaoContract.connect(spender).depositLmao(ethers.parseEther("50"));
  
  await getBalance(WWlmaoContract, "Wlmao Balance after depositing Lmao")
 await getBalance(spender, "Spender balance after depositing Lmao");
 await getBalance(owner, "Owner Balance after depositing Lmao");

  await WWlmaoContract.connect(spender).transfer(owner, ethers.parseEther("5"));


 await getBalance(owner, "Owner Balance after transfering WLmao");
 await getBalance(spender, "Spender Balance after transfering WLmao");
 await getBalance(WWlmaoContract, "Wlmao Balance after transfering WLmao")

 await WWlmaoContract.connect(spender).Withdraw(ethers.parseEther("41"));

 await getBalance(owner, "Owner Balance after withdrawing WLmao");
 await getBalance(spender, "Spender Balance after withdrawing WLmao");
 await getBalance(WWlmaoContract, "Wlmao Balance after withdrawing WLmao")





 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});