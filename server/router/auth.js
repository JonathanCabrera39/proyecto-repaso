// creamos nuestras rutas
const express = require("express");
const api = express.Router();

// importamos los controladores
const AuthController = require("../controllers/auth");

// configuracion de rutas
api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);

module.exports = api;