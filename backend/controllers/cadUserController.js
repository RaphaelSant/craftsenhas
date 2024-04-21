const express = require("express");
const db = require("./dbConfig");

const router = express.Router();

// Rota para ler (Read) os dados a serem exibidos para o usuário
router.get("/caduser", (req, res) => {
    const sql = "SELECT * FROM usuarios order by usuario";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Rota para cadastrar usuário
router.post("/caduser", (req, res) => {
    const { usuario, nome_completo, senha, isAdmin } = req.body;
    const sql = "INSERT INTO usuarios (usuario, nome_completo, senha, isAdmin) VALUES (?, ?, ?, ?)";

    // Verificar se o nome já está cadastrado
    const verificarNomeQuery = "SELECT * FROM usuarios WHERE usuario = ?";
    db.query(verificarNomeQuery, [usuario], (err, result) => {
        if (err) {
            res.status(500).send("Erro interno do servidor");
            throw err;
        }

        if (result.length > 0) {
            res.status(400).send("Nome já cadastrado");
        } else {
            // Inserir novo usuário no banco de dados
            db.query(sql, [usuario, nome_completo, senha, isAdmin], (err, result) => {
                if (err) {
                    res.status(500).send("Erro interno do servidor");
                    throw err;
                }
                res.status(201).send("Usuário cadastrado com sucesso");
            });
        }
    });
});

// Rota para atualizar dados
router.put("/caduser/:id", (req, res) => {
    const id = req.params.id;
    const { usuario, nome_completo, senha, isAdmin } = req.body;
    const sql = "UPDATE usuarios SET usuario=?, nome_completo=?, senha=?, isAdmin=? WHERE id=?";

    if (!cpf || !dataEntrada || !horaEntrada || !destino || !nome || !horaSaida) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    db.query(sql, [cpf, dataEntrada, destino, horaEntrada, horaSaida, nome, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

module.exports = router;