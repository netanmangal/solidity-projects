const { web3 } = require("hardhat");
const { expect } = require("chai");

const { abi, bytecode } = require("../artifacts/contracts/EtherStore.sol/EtherStore.json");

describe("EtherStore Tests", () => {
    let accounts;
    let etherStoreContractInstance;

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        etherStoreContractInstance = await new web3.eth.Contract(abi)
            .deploy({ data: bytecode })
            .send({ from: accounts[0] });
    });

    context("Regular tests with EOAccount", () => {
        it("Check Initial Balance to be 0", async () => {
            const response = await etherStoreContractInstance.methods.getBalance(accounts[0]).call();
            expect( parseFloat(response) ).to.equal(0);
        });

        it("Deposit Ethers and check balance", async () => {
            await etherStoreContractInstance.methods.depositEth().send({
                from: accounts[0],
                value: web3.utils.toWei(String(1.253), "ether")
            });

            const response = await etherStoreContractInstance.methods.getBalance(accounts[0]).call();
            expect( parseFloat(response) ).to.equal(1.253 * 10 ** 18);
            expect( parseFloat(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether")) ).to.lessThan(10000).greaterThan(10000 - 1.253 - 0.1);
        });

        it("Deposit -> Withdraw -> Check balance", async () => {
            await etherStoreContractInstance.methods.depositEth().send({
                from: accounts[0],
                value: web3.utils.toWei(String(1.253), "ether")
            });
            expect( parseFloat( await etherStoreContractInstance.methods.getBalance(accounts[0]).call() ) ).to.equal(1.253 * 10 ** 18);
            
            await etherStoreContractInstance.methods.withdrawEth(web3.utils.toWei(String(0.253), "ether")).send({
                from: accounts[0]
            });
            expect( parseFloat( await etherStoreContractInstance.methods.getBalance(accounts[0]).call() ) ).to.equal(1 * 10 ** 18);

            await etherStoreContractInstance.methods.withdrawEth(web3.utils.toWei(String(1), "ether")).send({
                from: accounts[0]
            });
            expect( parseFloat( await etherStoreContractInstance.methods.getBalance(accounts[0]).call() ) ).to.equal(0);
            expect( parseFloat(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether")) ).to.lessThan(10000).greaterThan(10000 - 2);
        });
    });
});