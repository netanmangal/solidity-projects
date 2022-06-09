const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const initWeb3 = () => {
    try {
        const provider = new HDWalletProvider({
            privateKeys: [`${process.env.PRIVATE_KEY}`],
            url: process.env.HTTPS_WEB3_PROVIDER
        });
    
        const web3 = new Web3(provider);
        return web3;
    } catch(e) {
        console.log(e);
    }    
};

module.exports.initWeb3 = initWeb3;