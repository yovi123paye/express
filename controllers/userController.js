const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;
  console.log(req.user);
  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.listarUsuarios = async (req, res) =>{
  const users = await User.find();
  if (users) {
    console.log(req.user);
  res.status(200).json({
      status:"success",
      timeOfRequest: req.requestTime,
      results : users.length,
      data: {
          users,
        },
  });
  }
  else {
    res.status(404).json({
      status: "Usuarios no encontrados",
    });
  }
  };

  exports.obtenerUsuarioPorId =catchAsync(async (req, res) =>{
    const vUsuario = await User.findById(req.params.id);
    if (vUsuario) {
        res.status(200).json({
          status: "Se encontro el Usuario",
          data: {
            user: vUsuario,
          },
        });
      } else {
        res.status(404).json({
          status: "Usuario no encontrado",
        });
        }
    });

    exports.editarUsuarioPorId = catchAsync(async (req, res) =>{
      const foundUsuario = await User.findById(req.params.id);
      if (foundUsuario) {
        var query = {  _id:  req.params.id};
        
        req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
        await User.updateOne(query, req.body);
        const usuarioAct = await User.findById(req.params.id);
        delete usuarioAct.password
        res.status(200).json({
          status: "Usuario actualizado correctamente",
          data: {
            user: usuarioAct,
          },
        });
      } else {
        res.status(404).json({
          status: "not found",
        });
      }
    }
    );
  
     exports.eliminarUsuarioPorId =catchAsync( async (req, res) =>{
      const vUsuario = await User.findById(req.params.id);
      if (vUsuario) {
      var query = {  _id:  req.params.id};
	     await User.deleteOne(query, req.body);
          res.status(200).json({
            status: "Se elimino el usuario correctamente",
          });
        } else {
          res.status(404).json({
            status: "No se encontro el usuario",
          });
        }
  });