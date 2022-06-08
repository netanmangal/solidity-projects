const { abi, bytecode } = require("../../contracts/PushBytes.json");
const { initWeb3 } = require("../utils/web3Initiator.js");

const initContract = async () => {
    const web3 = initWeb3();
    const accounts = await web3.eth.getAccounts();
    const contractInstance = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0]
        });

    return contractInstance;
}

module.exports.initContract = initContract;