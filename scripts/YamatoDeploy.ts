import { ethers } from "ethers";
import {
  YamatoTokenizedBallot__factory,
  Yamato__factory,
} from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const PROPOSALS = ["Akihito", "Naruhito", "Fumiko"];

//0xAd4489CA4cEc71D70E19bCf9B77Cdad216788f5D
// 0x416b696869746f  0x4e6172756869746f 0x46756d696b6f
const BLOCK_TARGET = 1;

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  // setup provider and wallets
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Error: private key not found");
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  // Deploy the Yamato Token Contract
  let yamatoContractFactory = new Yamato__factory(signer);
  const yamatoContract = await yamatoContractFactory.deploy();
  const deployTokenTxReceipt = await yamatoContract.deployTransaction.wait();

  console.log(
    `The Yamato Token contract was deployed at address ${yamatoContract.address} 
     at the block ${deployTokenTxReceipt.blockNumber}`
  );

  // Deploy the Yamato Tokenized Ballot Contract
  let yamatoBallotContractFactory = new YamatoTokenizedBallot__factory(signer);
  const yamatoBallotContract = await yamatoBallotContractFactory.deploy(
    convertStringArrayToBytes32(PROPOSALS),
    yamatoContract.address,
    BLOCK_TARGET
  );
  const deployBallotTxReceipt =
    await yamatoBallotContract.deployTransaction.wait();
  console.log(
    `The Yamato Ballot contract was deployed at address ${yamatoBallotContract.address} 
      at the block ${deployBallotTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
  // mint some tokens
  const mintTx = await contract.mint(account1.address, MINT_VALUE);
  const mintTxReceipt = await mintTx.wait();
  console.log(
    `The tokens were minted for the account of address ${account1.address} at the block ${mintTxReceipt.blockNumber}`
  );
  // check the voting power
  const account1Balance = await contract.balanceOf(account1.address);
  console.log(
    `The balance of the account of address ${account1.address} is ${account1Balance}`
  );

  let account1VotePower = await contract.getVotes(account1.address);
  console.log(
    `The vote power of the account 1 is ${ethers.utils.formatEther(
      account1VotePower
    )} units`
  );

  // self delegate
  const delegateTx = await contract
    .connect(account1)
    .delegate(account1.address);
  const delegateTxReceipt = await delegateTx.wait();
  let acount1VotePower = await contract.getVotes(account1.address);

  console.log(
    `The tokens were delageted from account 1 to itself at the block ${
      delegateTxReceipt.blockNumber
    }. Account 1 now has the vote power of 
    ${ethers.utils.formatEther(acount1VotePower)} units`
  );

  // Transfer
  const transferTx = await contract
    .connect(account1)
    .transfer(account2.address, MINT_VALUE.div(2));
  const transferTxReceipt = await transferTx.wait();

  console.log(
    `The tokens were transfered from account1 to account2 at the block ${transferTxReceipt.blockNumber}`
  );

  account1VotePower = await contract.getVotes(account1.address);
  console.log(`The vote power of account 1 is: ${account1VotePower}`);

  let account2VotePower = await contract.getVotes(account2.address);
  console.log(`The vote power of account 2 is now: ${account2VotePower}`);
  let account2Balance = await contract.balanceOf(account2.address);
  console.log(
    `The vote power of account 2 is now: ${ethers.utils.formatEther(
      account2Balance
    )}`
  );

  //historic vote power
  const currentBlock = await ethers.provider.getBlock("latest");
  console.log(`we are currently at the block ${currentBlock.number}`);

  for (let index = 1; index <= currentBlock.number; index++) {
    account1VotePower = await contract.getPastVotes(
      account1.address,
      currentBlock.number - index
    );
    console.log(
      `The vote power of account 1 was: ${ethers.utils.formatEther(
        account1VotePower
      )} at  block number ${currentBlock.number - index}`
    );
  }

  // // delegate vote power for account 2:
  // const delegateAccount2Tx = await contract
  //   .connect(account2)
  //   .delegate(account2.address);
  // const delegateAccount2TxReceipt = await delegateAccount2Tx.wait();

  // console.log(
  //   `The tokens were delegated from account 2 to itself at ${delegateAccount2TxReceipt.blockNumber}`
  // );
  // account2VotePower = await contract.getVotes(account2.address);
  // console.log(
  //   `Account 2 vote power is now: ${ethers.utils.formatEther(
  //     account2VotePower
  //   )}`
  // );



*/
