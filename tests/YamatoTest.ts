import { ethers } from "hardhat";
import { Yamato, Yamato__factory } from "../typechain-types";

const TEST_MINT_TOKENS = ethers.utils.parseEther("10");

describe("Yamato Tokenized Ballot", async () => {
  let myTokenContract: Yamato;

  // deploy the contract
  beforeEach(async () => {
    const [deployer, account1, account2] = await ethers.getSigners();
    const myTokenContractFactory = new Yamato__factory(deployer);
    myTokenContract = await myTokenContractFactory.deploy();
    const myTokenContractDeployReceipt =
      await myTokenContract.deployTransaction.wait();

    const mintTx = await myTokenContract.mint(
      account1.address,
      TEST_MINT_TOKENS
    );
    const mintTxReceipt = await mintTx.wait();

    // check the voting power
    const account1Balance = await myTokenContract.balanceOf(account1.address);
    const account1VotePower = await myTokenContract.getVotes(account1.address);

    console.log(
      `The account balance is ${ethers.utils.formatEther(account1Balance)}`
    );
    console.log(
      `The vote power balance is ${ethers.utils.formatEther(account1VotePower)}`
    );

    // self delegate:
    const delegateTx = await myTokenContract
      .connect(account1)
      .delegate(account1.address);
    const delegateTxReceipt = await delegateTx.wait();
    const newVotePower = await myTokenContract.getVotes(account1.address);
    console.log(
      `The vote power has been delegated at is ${delegateTxReceipt.blockNumber} 
      and the new vote power for the account is ${newVotePower}`
    );
  });
  describe("when a the Yamato Tokenized Ballot is deployed", function () {
    it("contains valid proposals", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("has 0 votes for each proposal", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("contains a valid blockTarget for when voting should commence", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("it has a valid address to the ERC20 tokens", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when a user mints tokens from Yamato", function () {
    it("they pay the correct amount of gas", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("they receive the correct amount of tokens", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("they receive 0 voting power for the tokens minted", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when a user delegates powerr", function () {
    it("they lose the correct amount of voting power", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("the delegetee gets the correct amount of voting power", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });

  describe("when a user votes", function () {
    it("they cannot vote more than their voting power", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("the proposal receives the correct number of votes", async function () {
      // TODO
      throw Error("Not implemented");
    });
    it("the users voting power decreases by the number votes they have used", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });
  describe("when a user checks the for the winning proposals", function () {
    it("the correct winning proposal ", async function () {
      // TODO
      throw Error("Not implemented");
    });
  });
});
