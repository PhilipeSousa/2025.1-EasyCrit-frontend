const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  console.log('Recebido:', req.body);
  const { email, senha } = req.body;

  fs.readFile('./usuarios.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler arquivo:', err);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
    }

    let usuarios;
    try {
      usuarios = JSON.parse(data);
    } catch (e) {
      console.error('Erro ao parsear JSON:', e);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor.' });
    }

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
      res.json({ sucesso: true, nome: usuario.nome });
    } else {
      res.json({ sucesso: false, mensagem: 'Email ou senha inválidos.' });
    }
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));