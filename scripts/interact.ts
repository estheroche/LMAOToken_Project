import { ethers, network } from "hardhat";



async function main() {

  const [owner] = await ethers.getSigners();



  // contract addresses
  const LmaoToken1 = "0x18ca7B243b1f315BBeC55e98C516C1Ce30dcBf87";
  const WWlmao = "0x8d825EFA26bDCA39f9EB7aD498C7d2C7d58f747d";
 

  const LmaoToken1Contract = await ethers.getContractAt("LmaoToken", LmaoToken1);
  const WWlmaoContract = await ethers.getContractAt("TokenB", WWlmao);
 

  // checking balances before

  const tLmaoToken1balance = ethers.formatEther(
    await LmaoToken1.balanceOf(owner)
  );
  const tokenBbalance = ethers.formatEther(
    await tokenBContract.balanceOf(owner)
  );
  const contractAbalance = ethers.formatEther(
    await tokenAContract.balanceOf(swap)
  );
  const contractBbalance = ethers.formatEther(
    await tokenBContract.balanceOf(swap)
  );
  const reserveA = ethers.formatEther(await swapContract.reserveA());
  const reserveB = ethers.formatEther(await swapContract.reserveB());
  console.log({
    tokenAbalance: tokenAbalance,
    tokenBbalance: tokenBbalance,
    contractAbalance: contractAbalance,
    contractBbalance: contractBbalance,
    reserveA: reserveA,
    reserveB: reserveB,
  });

  // approving allowances

  const allowance = ethers.parseEther("50000000000000000");

  await tokenAContract.connect(owner).approve(swap, allowance);
  await tokenBContract.connect(owner).approve(swap, allowance);

  // addliquidity

  const addTokenA = ethers.parseEther("200");
  const addTokenB = ethers.parseEther("500");

  const liquidity = await swapContract
    .connect(owner)
    .addLiquidity(addTokenA, addTokenB);
  await liquidity.wait();

  // removeliquidity

  const removeTokenA = ethers.parseEther("100");
  const removeTokenB = ethers.parseEther("250");

  const withdraw = await swapContract
    .connect(owner)
    .removeLiquidity(removeTokenA, removeTokenB);
  await withdraw.wait();

  // swapping A to B and checking amount of B out

  const amountA = ethers.parseEther("10");

  const swapAtoB = await swapContract.connect(owner).swapAToB(amountA);
  await swapAtoB.wait();

  console.log({
    amountBOut: ethers.formatEther(
      await swapContract.connect(owner).getAmountOut(amountA)
    ),
  });

  // swapping B to A and checking amount of A in

  const amountB = ethers.parseEther("23");

  const swapBtoA = await swapContract.connect(owner).swapBToA(amountB);
  await swapBtoA.wait();

  console.log({
    amountAIn: ethers.formatEther(
      await swapContract.connect(owner).getAmountIn(amountB)
    ),
  });

  // checking balances after

  const tokenAbalance2 = ethers.formatEther(
    await tokenAContract.balanceOf(owner)
  );
  const tokenBbalance2 = ethers.formatEther(
    await tokenBContract.balanceOf(owner)
  );
  const contractAbalance2 = ethers.formatEther(
    await tokenAContract.balanceOf(swap)
  );
  const contractBbalance2 = ethers.formatEther(
    await tokenBContract.balanceOf(swap)
  );
  const reserveA2 = ethers.formatEther(await swapContract.reserveA());
  const reserveB2 = ethers.formatEther(await swapContract.reserveB());
  console.log({
    tokenAbalance: tokenAbalance2,
    tokenBbalance: tokenBbalance2,
    contractAbalance: contractAbalance2,
    contractBbalance: contractBbalance2,
    reserveA: reserveA2,
    reserveB: reserveB2,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});