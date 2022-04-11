const { expect } = require("chai");
const { web3 } = require("hardhat");

const { abi, bytecode } = require("../artifacts/contracts/random-number.sol/RandomNumberConsumer.json");

describe("Random Number", async () => {

    let contractInstance;
    let accounts;

    beforeEach(async () => {

        accounts = await web3.eth.getAccounts();

        contractInstance = await new web3.eth.Contract(abi)
            .deploy({
                data: bytecode,
                arguments: ["0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9", "0xa36085F69e2889c224210F603D836748e7dC0088", "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4"]
            })
            .send({from: accounts[0]});
    });

    it("Deploy contract", async () => {
        console.log(contractInstance.options.address);
        expect(true).to.be.equal(false);
    });
});