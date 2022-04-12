const { expect } = require("chai");
const { web3, network } = require("hardhat");

const { abi, bytecode } = require("../artifacts/contracts/random-number.sol/RandomNumberConsumer.json");
const { abi: linkTokenAbi } = require("../artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json");

describe("Random Number", async () => {
    let contractInstance;
    let accounts;

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        console.log(accounts);

        contractInstance = await new web3.eth.Contract(abi)
            .deploy({
                data: bytecode,
                arguments: ["0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9", "0xa36085F69e2889c224210F603D836748e7dC0088", "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4"]
            })
            .send({ from: accounts[0] });
    });

    it("requestRandomNumber function testing - Hardhat network - No fulfillRequest called automatically", async () => {
        const contractAddress = contractInstance.options.address;

        //get LINK token contract instance
        const linkTokenContractInstance = new web3.eth.Contract(linkTokenAbi, "0xa36085F69e2889c224210F603D836748e7dC0088");

        // impersonate account that has LINK tokens on forked chain
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0x65a3fE4a37Be6Df8d98e113A5c4DA8F3f8B72C44"],
        });

        // transfer LINK tokens to contract address
        await linkTokenContractInstance.methods.transfer(contractAddress, "1000000000000000000").send({
            from: "0x65a3fE4a37Be6Df8d98e113A5c4DA8F3f8B72C44"
        });
        console.log("Link token balance of sender - " + await linkTokenContractInstance.methods.balanceOf("0x65a3fE4a37Be6Df8d98e113A5c4DA8F3f8B72C44").call());
        console.log("Link token balance of contract - " + await linkTokenContractInstance.methods.balanceOf(contractAddress).call());
        
        // call the contract requestRandomNumber function
        await contractInstance.methods.requestRandomNumber().send({
            from: accounts[0]
        });
        
        console.log("After requestRandomNumber request (fee transferred), Link token balance of contract - " + await linkTokenContractInstance.methods.balanceOf(contractAddress).call());

        let i = 0;
        setInterval(async () => {
            console.log(i * 2500 + "  - Received random number - " + await contractInstance.methods.randomNumber().call());
            i++;
        }, 2500);

        await new Promise(r => setTimeout(r, 360000));

        // expect(true).to.be.equal(false);
    });

    it("requestRandomNumber function testing - Kovan Network", async () => {
        const contractAddress = contractInstance.options.address;

        //get LINK token contract instance
        const linkTokenContractInstance = new web3.eth.Contract(linkTokenAbi, "0xa36085F69e2889c224210F603D836748e7dC0088");

        // transfer LINK tokens to contract address
        await linkTokenContractInstance.methods.transfer(contractAddress, "1000000000000000000").send({
            from: "0x65a3fE4a37Be6Df8d98e113A5c4DA8F3f8B72C44"
        });
        console.log("Link token balance of sender - " + await linkTokenContractInstance.methods.balanceOf("0x65a3fE4a37Be6Df8d98e113A5c4DA8F3f8B72C44").call());
        console.log("Link token balance of contract - " + await linkTokenContractInstance.methods.balanceOf(contractAddress).call());
        
        // call the contract requestRandomNumber function
        await contractInstance.methods.requestRandomNumber().send({
            from: accounts[0]
        });
        
        console.log("After requestRandomNumber request (fee transferred), Link token balance of contract - " + await linkTokenContractInstance.methods.balanceOf(contractAddress).call());

        let i = 0;
        setInterval(async () => {
            console.log(i * 2500 + "  - Received random number - " + await contractInstance.methods.randomNumber().call());
            i++;
        }, 2500);

        await new Promise(r => setTimeout(r, 360000));
    });
});