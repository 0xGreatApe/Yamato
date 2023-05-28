import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Yamato__factory } from "../typechain-types";
dotenv.config();



async function main() {
  // setup wallet and provider
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length < 0) {
    throw new Error("Error Invalid private key, check .env file");
  }
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);
  // setup token contract
  const yamatoContractFactory = new Yamato__factory(signer);
  const yamatoContract = yamatoContractFactory.attach(
    String(process.env.YAMATO_CONTRACT_ADDRESS)
  );
  try {
    const delegateSelfTx = await yamatoContract
      .connect(signer)
      .delegate(signer.address);
    const delegateTxReceipt = await delegateSelfTx.wait();
    console.log(
      `The tokens were delegated from the user ${signer.address} to itself at ${delegateTxReceipt.blockNumber}`
    );
  } catch (error) {
    console.log(`Error, unable to delegate voting power: ${error}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
