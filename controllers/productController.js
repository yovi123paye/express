const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    console.log(req.user);
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
exports.eliminarProductoPorId =catchAsync( async(req, res) => {
  console.log("Ingreso a eliminar Producto");
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    var query = {  _id:  req.params.id};
	   await Product.deleteOne(query, req.body);
    res.status(200).json({
      status: "Se elimino el producto correctamente",
    });
  } else {
    res.status(404).json({
      status: "No se encontro el producto",
    });
  }
});

exports.editarProductoPorId = catchAsync (async  (req, res) => {
  const ProductoEncontrado = await Product.findById(req.params.id);
      if (ProductoEncontrado) {
    var query = {  _id:  req.params.id};
	   await Product.updateOne(query, req.body);
   const updateProduct=  await Product.findById(req.params.id);
    res.status(200).json({
      status: "Se actualizo el producto correctamente",
      data: {
        product: updateProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});