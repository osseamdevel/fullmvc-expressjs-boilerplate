const { Router } = require("express");
const route = Router();

const homeController = require("./src/controllers/homeController");

// Rotas da Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

module.exports = route;