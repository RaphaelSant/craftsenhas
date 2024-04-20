const express = require("express");
const db = require("./dbConfig");
const router = express.Router();

// Rota para cadastrar usuário
router.post("/caduser", (req, res) => {
    const { nome, nome_completo, senha } = req.body;

    // Verificar se o nome já está cadastrado
    const verificarNomeQuery = "SELECT * FROM usuarios WHERE nome = ?";
    db.query(verificarNomeQuery, [nome], (err, result) => {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            throw err;
        }

        if (result.length > 0) {
            res.status(400).send("Nome já cadastrado");
        } else {
            // Inserir novo usuário no banco de dados
            const cadastrarUsuarioQuery = "INSERT INTO usuarios (nome, nome_completo, senha) VALUES (?, ?, ?)";
            db.query(cadastrarUsuarioQuery, [nome, nome_completo, senha], (err, result) => {
                if (err) {
                    res.status(500).send("Erro interno do servidor");
                    throw err;
                }
                res.status(201).send("Usuário cadastrado com sucesso");
            });
        }
    });
});

module.exports = router;