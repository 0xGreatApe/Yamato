import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { YamatoTokenizedBallot__factory } from "../typechain-types";

dotenv.config();

/* Usage: Call this script by running:
    `yarn run ts-node --files ./scripts/setSnapshotBlock.ts {newTargetBlockNumber}`
    where {newTargetBlockNumber} is an integer containing the target block
*/
async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  // setup wallet connection with provider
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Error invalid private key, check .env file");
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  // setup connection with live contract
  const yamatoBallotFactory = new YamatoTokenizedBallot__factory(signer);
  const yamatoBallotContract = yamatoBallotFactory.attach(
    String(process.env.YAMATO_BALLOT_CONTRACT_ADDRESS)
  );

  // get snapshot from script input:
  const args = process.argv;
  const newSnapshotTarget = args[2];
  if (!newSnapshotTarget || newSnapshotTarget.length <= 0)
    throw new Error("Error invalid snapshot number entered");

  // Convert string to BigNumber using ethers.js library
  let blockNumberTarget = ethers.BigNumber.from(newSnapshotTarget);
  // call setSnapshot
  try {
    const setSnapshotTx = await yamatoBallotContract.setSnapshotBlock(
      blockNumberTarget
    );
    const snapTxReceipt = await setSnapshotTx.wait();
    console.log(
      `The new snapshot block number is ${blockNumberTarget.toString()}.
       This was changed by the owner at blocknumber ${
         snapTxReceipt.blockNumber
       }`
    );
  } catch (Error) {
    console.log(`Error setting snapshot: ${Error}`);
  }
}

main().catch(async (error) => {
  console.error(`Error: ${error}`);
});
