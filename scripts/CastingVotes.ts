import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { YamatoTokenizedBallot__factory } from "../typechain-types";
dotenv.config();
/*
  call this script using: yarn run ts-node --files ./scripts/CastingVotes.ts "proposal" "amount"
*/
async function main() {
  //setup provider
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Error invalid Private Key, check ENV file");
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  //read user entered info:
  const args = process.argv;
  const proposalToVote = args[3];
  const voteAmount = args[4];

  //connect to smart contracts
  const yamatoBallotContractFactory = new YamatoTokenizedBallot__factory(
    signer
  );
  const yamatoBallotContract = yamatoBallotContractFactory.attach(
    String(process.env.YAMATO_BALLOT_CONTRACT_ADDRESS)
  );
  
  try {
    const voteTx = await yamatoBallotContract.vote(0, 10);
    const voteTxReceipt = await voteTx.wait();

    console.log(
      `the user ${signer.address} placed ${voteAmount} of votes for proposal: ${proposalToVote} at ${voteTxReceipt.blockNumber}`
    );
  } catch (error) {
    console.log(`Error casting vote: ${error}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
