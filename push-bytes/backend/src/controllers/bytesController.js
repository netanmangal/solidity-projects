const hex = require('string-hex');

async function getData(req, res, next) {
    try {
        const response_hex = await req.contractInstance.methods.hash(req.query?.key).call();
        res.status(200).send({ success: true, msg: {
            hexData: response_hex, 
            data: response_hex ? JSON.parse( req.web3.utils.hexToAscii(response_hex) ) : null
        } });
    } catch(e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function pushData(req, res, next) {
    try {
        let rec_values = req.body.value;
        let value = "0x" + hex( JSON.stringify(rec_values) );

        const response = await req.contractInstance.methods.pushData(req.body.key, value).send({
            from: req.accounts[0]
        });
        res.status(200).send({ success: true, msg: response });
    } catch(e) {
        console.log("Point 2 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

module.exports.getData = getData;
module.exports.pushData = pushData;