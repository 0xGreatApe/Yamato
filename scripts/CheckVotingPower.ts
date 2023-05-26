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
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey.length <= 0)
    throw new Error("Error no private key, check .env file");
  const wallet = new ethers.Wallet(privateKey);
  const signer = wallet.connect(provider);

  // get contract
  const yamatoContractFactory = new Yamato__factory(signer);
  const yamatoContract = yamatoContractFactory.attach(
    String(process.env.YAMATO_CONTRACT_ADDRESS)
  );
  const votingPower = await yamatoContract.getVotes(signer.address);
  console.log(
    `The user: ${
      signer.address
    } has a voting power of ${ethers.utils.formatEther(votingPower)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
