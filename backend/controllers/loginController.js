const express = require("express");
const db = require("./dbConfig");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Rota para autenticar usuário e gerar token JWT
router.post("/login", (req, res) => {
    const { usuario, senha } = req.body;
    const query = `SELECT * FROM usuarios WHERE usuario = ? AND senha = ?`;


    db.query(query, [usuario, senha], (err, result) => {
        if (err) {
            res.status(500).send("Erro interno");
            throw err;
        }

        if (result.length > 0) {
            const isAdmin = result[0].administrador;

            // Usuário autenticado - gerar token JWT
            const token = jwt.sign({ usuario: usuario, isAdmin: isAdmin }, "seuSegredoSuperSecreto", {
                expiresIn: "2h",
            });
            res.status(200).json({ token });
        } else {
            res.status(401).send("Credenciais inválidas");
        }
    });
});

module.exports = router;