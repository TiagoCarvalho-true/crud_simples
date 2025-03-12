// 📌 Importando módulos
const express = require("express"); // Framework para criar o servidor
const sqlite3 = require("sqlite3").verbose(); // Banco de dados SQLite
const cors = require("cors"); // Permite requisições entre frontend e backend
const bodyParser = require("body-parser"); // Middleware para processar JSON

// 📌 Inicializa o servidor Express
const app = express();
app.use(cors()); // Permite comunicação do frontend
app.use(bodyParser.json()); // Processa JSON no corpo da requisição
// 📌 Rota para editar um usuário
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) return res.status(400).json({ mensagem: "Nome é obrigatório!" });

    const sql = "UPDATE usuarios SET nome = ? WHERE id = ?";
    db.run(sql, [nome, id], function (err) {
        if (err) {
            console.error("Erro ao atualizar:", err);
            return res.status(500).json({ mensagem: "Erro ao atualizar no banco." });
        }
        res.json({ mensagem: "Nome atualizado com sucesso!" });
    });
});

// 📌 Rota para deletar um usuário
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            console.error("Erro ao deletar:", err);
            return res.status(500).json({ mensagem: "Erro ao deletar do banco." });
        }
        res.json({ mensagem: "Usuário deletado com sucesso!" });
    });
});
// 📌 Conexão com o Banco de Dados SQLite
const db = new sqlite3.Database("meusite.db", err => {
    if (err) console.error("Erro ao conectar ao SQLite:", err);
    else console.log("✅ Banco de dados SQLite conectado!");
});
// 📌 Criar a tabela 'usuarios' se não existir
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT)");
    console.log("✅ Tabela 'usuarios' verificada/criada com sucesso.");
});

// 📌 Rota para salvar um novo usuário
app.post("/salvar", (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ mensagem: "Nome é obrigatório!" });
    const sql = "INSERT INTO usuarios (nome) VALUES (?)";
    db.run(sql, [nome], function (err) {
        if (err) {
            console.error("Erro ao inserir:", err);
            return res.status(500).json({ mensagem: "Erro ao salvar no banco." });
        }
        res.json({ mensagem: "Nome salvo com sucesso!", id: this.lastID });
    });
});
// 📌 Rota para listar todos os usuários
app.get("/usuarios", (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err);
            return res.status(500).json({ mensagem: "Erro ao buscar usuários." });
        }
        res.json(rows);
    });

});
// 📌 Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("🚀 Servidor rodando na porta 3000");
});
