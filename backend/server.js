const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const loginController = require("./controllers/loginController.js");

const app = express();
app.use(cors());
app.use(express.json());

// Geters
app.get("/", (re, res) => {
    return res.json("From backend side!");
});

// Controllers
app.use("/", loginController);

app.listen(8081, () => {
    console.log("listening");
});