const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());        //for parsing application/json
app.use(express.urlencoded({    //for parsing application/x-www-form-urlencoded
    "extended": true
}));
app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("Welcome to homepage.");
});

app.listen("3000", () => {
    console.log("Server running on port 3000.");
});