async function getData(req, res, next) {
    try {
        res.status(200).send({ success: true, msg: "" });
    } catch(e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function pushData(req, res, next) {
    try {
        res.status(200).send({ success: true, msg: "" });
    } catch(e) {
        console.log("Point 2 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

module.exports.getData = getData;
module.exports.pushData = pushData;