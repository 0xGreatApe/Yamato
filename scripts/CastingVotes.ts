import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { YamatoTokenizedBallot__factory } from "../typechain-types";
dotenv.config();
/*
  call this script using: yarn run ts-node --files ./scripts/CastingVotes.ts {proposal} {amount}
  where {proposal} is an integer index of valid proposals
  and {amount} is an integer value of tokens to vote
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

  //connect to smart contracts
  const yamatoBallotContractFactory = new YamatoTokenizedBallot__factory(
    signer
  );
  const yamatoBallotContract = yamatoBallotContractFactory.attach(
    String(process.env.YAMATO_BALLOT_CONTRACT_ADDRESS)
  );

  //read user entered info:
  const args = process.argv;
  const proposalToVote = args[2];
  const amountToVote = args[3];

  let totalProposals = ethers.BigNumber.from(
    yamatoBallotContract.proposals.length
  );

  let userVotePower = await yamatoBallotContract.votingPower(signer.address);

  let proposalIndex = ethers.BigNumber.from(proposalToVote);
  let votesCast = ethers.BigNumber.from(amountToVote);
  // Check input validity:
  if (
    proposalIndex < ethers.BigNumber.from(0) ||
    proposalIndex >= totalProposals
  ) {
    throw new Error("Error: Invalid proposal index");
  }

  if (votesCast > userVotePower)
    throw new Error("Error: user does not have enough voting power");

  try {
    const voteTx = await yamatoBallotContract.vote(proposalIndex, votesCast);
    const voteTxReceipt = await voteTx.wait();

    console.log(
      `the user ${signer.address} placed ${votesCast} of votes for proposal: ${proposalToVote} at ${voteTxReceipt.blockNumber}`
    );
  } catch (error) {
    console.log(`Error casting vote: ${error}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
