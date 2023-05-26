import { ethers } from "ethers";
import * as dotenv from "dotenv";
import {
  YamatoTokenizedBallot__factory,
  Yamato__factory,
} from "../typechain-types";
dotenv.config();

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );

  // private key
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Error: Private Key not Found, check .env file");
  // create wallet signer
  const wallet = new ethers.Wallet(privateKey);
  // create signer
  const signer = wallet.connect(provider);
  //create
  const yamatoBallotContractFactory = new YamatoTokenizedBallot__factory(
    signer
  );
  const yamatoBallotContract = yamatoBallotContractFactory.attach(
    String(process.env.YAMATO_CONTRACT_ADDRESS)
  );

  const winnerName = await yamatoBallotContract.winnerName();
  console.log(
    `The Winning Proposal is: ${ethers.utils.parseBytes32String(winnerName)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
