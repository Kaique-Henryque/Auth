const { me } = require("../../services/auth.service");

const authMiddleware = (req, res, next) => {
  const auth = req.header("Authorization");

  let statusCode;
  let data;

  if (auth && auth.includes("Bearer ")) {
    const token = auth.split(" ")[1];

    data = me(token)
      .then((usuario) => {
        req.usuario = usuario;
        next();
      })
      .catch((err) => {
        res.status(err.status).send(err.mensagem);
      });
  } else {
    res.status(401).send("Token indisponível");
  }
};

module.exports = authMiddleware;
