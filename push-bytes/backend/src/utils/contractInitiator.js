const { abi, bytecode } = require("../../contracts/PushBytes.json");

const initContract = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    // const contractInstance = await new web3.eth.Contract(abi)
    //     .deploy({
    //         data: bytecode
    //     })
    //     .send({
    //         from: accounts[0]
    //     });

    const contractInstance = await new web3.eth.Contract(abi, "0xcEB120f0Ed250680F6671b66705f7B45feB066a9");
    return contractInstance;
}

module.exports.initContract = initContract;