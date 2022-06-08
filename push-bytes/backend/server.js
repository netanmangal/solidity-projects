const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const {initWeb3} = require("./src/utils/web3Initiator.js");
const {initContract} = require("./src/utils/contractInitiator.js");

const app = express();
let web3, contractInstance;

app.use(express.json());        //for parsing application/json
app.use(express.urlencoded({    //for parsing application/x-www-form-urlencoded
    "extended": true
}));
app.use(morgan("tiny"));
app.use(cors());

app.use((req, res, next) => {
    req.web3 = web3;
    req.contractInstance = contractInstance;
    next();
});

app.get("/", (req, res, next) => {
    console.log(req.contractInstance);
    res.send({success: true, msg: "Welcome to homepage.", contractAddress: req.contractInstance._address});
});

app.listen("3000", async () => {
    web3 = await initWeb3();
    contractInstance = await initContract(web3);
    console.log("Server running on port 3000.");
});