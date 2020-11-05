const jwt = require("jsonwebtoken");
const UsuarioModel = require("../models/usuario.model");
const secret = "chave-secreta";

const criarTokenCriptografado = (payload) => {
  let token = jwt.sign(payload, secret);
  token = Buffer.from(token).toString("base64");

  return token;
};

const descriptografarToken = (token) => {
  return (result = Buffer.from(token, "base64").toString("utf-8"));
};

const login = async (email, senha) => {
  const dados = await UsuarioModel.findOne({ where: { email } })
    .then((usuario) => {
      if (usuario) {
        if (usuario.senha == senha) {
          const token = criarTokenCriptografado({
            ...usuario.dataValues,
            senha: "[FILTRADO]",
          });

          return { usuario, token };
        } else {
          throw { mensagem: "Usuario ou senha inválidos!", status: 400 };
        }
      } else {
        throw { mensagem: "Usuario ou senha inválidos!", status: 400 };
      }
    })
    .catch(() => {
      throw {
        mensagem: "Erro ao se conectar com o banco de dados",
        status: 500,
      };
    });

  return dados;
};

const criarUsuario = async (data) => {
  const dados = await UsuarioModel.create(data)
    .then((usuario) => {
      const token = criarTokenCriptografado({
        ...usuario.dataValues,
        senha: "[FILTRADO]",
      });

      return { usuario, token };
    })
    .catch((error) => {
      if (error.name === "SequelizeValidationError") {
        console.error(error);
        throw { mensagem: "Erro ao validar dados", status: 422 };
      } else {
        console.error(error);
        throw {
          mensagem: "Erro ao se conectar com o banco de dados",
          status: 500,
        };
      }
    });

  return dados;
};

const me = async (token) => {
  try {
    const tokenDescriptografado = descriptografarToken(token);
    return jwt.verify(tokenDescriptografado, secret);
  } catch (error) {
    throw { mensagem: "Token inválido ou vencido", status: 401 };
  }
};

module.exports = {
  login,
  criarUsuario,
  me,
};
