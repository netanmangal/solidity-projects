const { ethers, upgrades } = require("hardhat");

async function main() {
    const Store = await ethers.getContractFactory("Store");

    console.log("Deploying proxy admin, transparent upgradable proxy and implementation contract");
    const store = await upgrades.deployProxy(Store, [2, 456], {initializer: "setNumbers"});

    console.log(store);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })