const connection = require("../database/db");
const { DataTypes } = require("sequelize");

const UsuarioModel = connection.define(
  "Usuarios",
  {
    nome: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    senha: {
      type: DataTypes.TEXT,
    },
  },
  {
    underscored: true,
    modelName: "Usuarios",
    freezeTableName: true,
    timestamps: false,
    defaultScope: false,
  }
);

module.exports = UsuarioModel;
