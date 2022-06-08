const { abi, bytecode } = require("../../contracts/PushBytes.json");

const initContract = async (web3) => {
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