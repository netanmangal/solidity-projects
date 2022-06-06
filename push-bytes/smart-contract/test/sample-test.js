const { expect } = require("chai");
const { web3 } = require("hardhat");

const { abi, bytecode } = require("../artifacts/contracts/PushBytes.sol/PushBytes.json");

describe("PushBytes", function () {

  let accounts;
  let contractInstance;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    contractInstance = await new web3.eth.Contract(abi)
      .deploy({
        data: bytecode
      })
      .send({ from: accounts[0] });
  });

  context("Push and get bytes", () => {
    it("Initially, Null bytes at key 1", async () => {
      const response = await contractInstance.methods.hash("1").call();
      expect(response).to.equal(null);
    });

    it("Push data", async () => {
      const value = "0x0010fe";

      await contractInstance.methods.pushData("1", value).send({
        from: accounts[0]
      });
      const response = await contractInstance.methods.hash("1").call();
      expect(response).to.equal(value);
    });
  });

  context("Access Control", () => {
    it("Push by non-admin account : Report Error", async () => {
      try {
        await contractInstance.methods.pushData("1", value).send({
          from: accounts[1]
        });

        // should throw error and control goto catch block

        expect(true).to.equal(false);
      } catch (e) {
        expect(e).to.not.equal(null);
      }
    });
  });

});
