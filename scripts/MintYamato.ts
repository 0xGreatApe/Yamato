import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { Yamato__factory } from "../typechain-types";
dotenv.config();

const MINT_TOKENS_AMOUNT = ethers.utils.parseEther("10");

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Invalid Private Key check Environment variables");
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  const yamatoContractFactory = new Yamato__factory(signer);
  const yamatoContract = yamatoContractFactory.attach(
    String(process.env.YAMATO_CONTRACT_ADDRESS)
  );

  // Mint tokens
  try {
    const mintTx = await yamatoContract.mint(
      signer.address,
      MINT_TOKENS_AMOUNT
    );
    const mintTxReceipt = await mintTx.wait();
    const newBalance = await yamatoContract.balanceOf(signer.address);

    console.log(
      `The user ${signer.address} minted ${ethers.utils.formatEther(
        MINT_TOKENS_AMOUNT
      )} at blockNumber: ${
        mintTxReceipt.blockNumber
      }. The user now has ${ethers.utils.formatEther(newBalance)} YMT Tokens`
    );
  } catch (error) {
    console.log(`Error minting tokens: ${error}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
