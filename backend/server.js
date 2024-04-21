const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const verificarToken = require("./middlewares/authMiddleware.js");

const loginController = require("./controllers/loginController.js");
const cadUserController = require("./controllers/cadUserController.js");

const app = express();
app.use(cors());
app.use(express.json());

// Geters
app.get("/", (re, res) => {
    return res.json("From backend side!");
});

// Controllers
app.use("/", loginController);
app.use("/", cadUserController);

// Rota protegida
app.get("/recursoProtegido", verificarToken, (req, res) => {
    res.status(200).send("Acesso permitido ao recurso protegido");
});

app.listen(8081, () => {
    console.log("listening");
});