const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../helpers/middlewares/auth.middleware");

const routerAuth = Router();

routerAuth
  .get("/me", authMiddleware, authController.me)
  .post("/login", authController.login)
  .post("/criarUsuario", authController.criarUsuario);

module.exports = routerAuth;
