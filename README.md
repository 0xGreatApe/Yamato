# Project Objective:

Develop and run scripts for “TokenizedBallot.sol” to:

- Give voting tokens (Mint Tokens)
- Delegating voting power
- Casting votes
- Checking vote power
- Querying results

The goal of this project is to demonstrate the ability to run scripts to mint new ERC20 Tokens which use standard OpenZeppelin contracts to obtain voting rights and vote using a modified version of the "Tokenised Ballot" Example in the Solidity Docs.

# Details

Using the “**Solidity By Example”** `Ballot.sol` as the basis for a Ballot contract (code can be found [here](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html)), create an ERC20 voting token using OpenZeppelin to enable users to cast votes for specific proposals in a ballot contract.

# Yamato:

Yamato refers to the ancient historical period and clan in Japan, often associated with the early imperial rule and the foundation of the Japanese state. This name draws inspiration from Asian history and carries a sense of tradition and cultural significance

# File Structure

We require 2 **Contracts**:

- ERC20 Contract - `Yamato.sol` ( I’ve given my project the name `Yamato` )
- TokenizedBallot Contract - `YamatoBallot.sol`

We require 1 test scripts:

- `YamatoBallotTest.ts`

We require several scripts:

- `YamatoDeploy.ts` - this script will deploy both contracts, it will also allow the deployer to mint some tokens for themselves to get started.
- `CastingVotes.ts` - this script will allow the caller to cast votes using the `YamatoBallot`
- `CheckVotingPower.ts` - this script will allow the caller to check how much voting power they have with the `YamatoBallot`.
- `DelegateVotingPower.ts` - this script will allow the caller to delegate their voting power to either themselves or another user with the `YamatoBallot`
- `MintYamato.ts`- this script will give voting tokens to the caller with the `YamatoBallot` i.e. mint tokens.
- `QueryResults.ts` - this will allow the caller to check the the `YamatoBallot` to get the results of the Ballot.

# Deployed Contracts:

- Yamato Token Contract address: `0xAd4489CA4cEc71D70E19bCf9B77Cdad216788f5D`
- Yamato Ballot Contract address: `0x75AB9B3d9C75858575b5217Df1Bbf2B6f5205f94`

# Running Scripts:

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
