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

// Rota para selecionar os dados por ID
router.get("/caduser/selectId/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM usuarios WHERE id = ?"; // Consulta SQL para buscar o registro pelo ID
    db.query(sql, id, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.json({ message: "Registro não encontrado" });
        }
        return res.json(data[0]); // Retorna o primeiro registro encontrado (se houver)
    });
});

// Rota para atualizar dados
router.put("/caduser/:id", (req, res) => {
    const id = req.params.id;
    const { usuario, nome_completo, senha, isAdmin } = req.body;
    const sql = "UPDATE usuarios SET usuario=?, nome_completo=?, senha=?, isAdmin=? WHERE id=?";

    if (!usuario || !nome_completo || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    db.query(sql, [usuario, nome_completo, senha, isAdmin, id], (err, result) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    });
});

// Rota para deletar dados.
router.delete("/caduser/:id", (req, res) => {
    const usuariosId = req.params.id;
    const sql = `DELETE FROM usuarios WHERE id = ?`;
    db.query(sql, usuariosId, (err, result) => {
        if (err) return res.json(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.json({ message: "Registro deletado com sucesso" });
    });
});

module.exports = router;