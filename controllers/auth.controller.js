const authService = require("../services/auth.service");

const me = (req, res) => {
  res.send(req.usuario);
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  authService
    .login(email, senha)
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((error) => {
      res.status(error.status).send(error.mensagem);
    });
};

const criarUsuario = async (req, res) => {
  const data = req.body;

  authService
    .criarUsuario(data)
    .then((resultado) => {
      res.send(resultado);
    })
    .catch((error) => {
      res.status(error.status).send(error.mensagem);
    });
};

module.exports = { me, login, criarUsuario };
