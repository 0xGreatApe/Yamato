import { ethers } from "ethers";

async function main() {
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.INFURA_API_KEY
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
