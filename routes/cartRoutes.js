const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();

cartRouter.route("/producto")
          .all(authController.protect)
          .get(cartController.listarCarrito)
          .post(cartController.adicionarProductoAlCarrito);

cartRouter.route("/producto/:id")
          .all(authController.protect)
           .delete(cartController.eliminarProductoCarrito);

cartRouter.route("/pay")
        .all(authController.protect)
        .post(cartController.pagarCarrito);
module.exports = cartRouter;