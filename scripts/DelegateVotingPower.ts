import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { Yamato__factory } from "../typechain-types";
dotenv.config();

/* To call script:
 * yarn run ts-node --files ./scripts/DelegateVotingPower.ts {delegatorAddress} {delegateeAddress}
 * where {delegatorAddress} is the ethereum address of the delegator and signer of this script
 * & {delegateeAddress} is the ethereum address of the delegatee to receive the voting power
 */
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

  // get delegatee address from user input
  const args = process.argv;
  const delegateeAddress = args[3];
  if (!delegateeAddress || delegateeAddress.length <= 0)
    throw new Error("Error, no Delegatee address entered");
  if (!ethers.utils.isAddress(delegateeAddress))
    throw new Error("Delegatee Address is an Invalid Ethereum Address entered");

  // delegate tokens
  try {
    const delegateSelfTx = await yamatoContract
      .connect(signer.address)
      .delegate(delegateeAddress);
    const delegateTxReceipt = await delegateSelfTx.wait();
    console.log(
      `The tokens were delegated from the user ${signer.address} to the user ${delegateeAddress} at ${delegateTxReceipt.blockNumber}`
    );
  } catch (error) {
    console.log(`Error, unable to delegate voting power: ${error}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
