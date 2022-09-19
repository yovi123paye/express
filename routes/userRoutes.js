const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
const authController = require("./../controllers/authController");
//routes
userRouter
  .route("/")
  //.all(authController.protect)
  .get(userController.listarUsuarios)
  .post(userController.addUser);
  userRouter.route("/:id")
      //      .all(authController.protect)
            .get(userController.obtenerUsuarioPorId)
            .put(userController.editarUsuarioPorId)
            .delete(userController.eliminarUsuarioPorId);

module.exports = userRouter;
