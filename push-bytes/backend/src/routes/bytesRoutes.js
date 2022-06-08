const express = require("express");
const app = express();

const bytesController = require("../controllers/bytesController.js");

app.get("/get", (req, res, next) => {
    bytesController.getData(req, res, next);
});

app.post("/push", (req, res, next) => {
    bytesController.pushData(req, res, next);
});