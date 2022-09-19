const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const Cart = require("../models/Cart");

exports.listarCarrito = catchAsync(async (req, res) => {
    const carritos = await Cart.find();
    res.status(200).json({
      status: "Listar Carrito",
      timeOfRequest: req.requestTime,
      results: carritos.length,
      data: {
        carritos,
      },
    });
  });

  exports.adicionarProductoAlCarrito = catchAsync(async (req, res) => {
    var query = {  status:  'PENDING', user: req.user.userName};
     const foundCart = await Cart.findOne(query);
     if(foundCart){           
         const updateCart = new Cart();
         updateCart._id = foundCart._id;
         updateCart.user= req.user.userName;       
         updateCart.products = [... foundCart.products, req.body.product];
 
         const cartResponse = await Cart.updateOne(query, updateCart);
 
         res.status(200).json({
         status: "success",
         data: {
             pedido: updateCart,
         },
         });
     }else {
         const newCart = new Cart();
         newCart.user = req.user.userName;
         let arrayProducts = newCart.products;
         let newData = [... arrayProducts, req.body.product];
         
         newCart.products = newData;
         console.log(newCart);
         
         let cartResponse = await Cart.create(newCart);
         res.status(200).json({
             status: "success",
             data: {
                 pedido: cartResponse,
             },
             });
     }
   });

   exports.eliminarProductoCarrito = catchAsync(async (req, res) => {
    const param =  req.params.id;
    console.log(param);
    var query = {  status:  'PENDING', user: req.user.userName};
    const foundCart = await Cart.findOne(query);
     if(foundCart){
    
         const updateCart = new Cart();
         updateCart._id = foundCart._id;
         updateCart.user= foundCart.user;       
         
         var lista = foundCart.products;
         console.log(lista);
         var listaProductos = lista.filter((item) => item._id !== req.params.id);
        console.log(listaProductos.length);
        
        updateCart.products = listaProductos;
     	  const cartResponse = await Cart.updateOne(query, updateCart);
         res.status(200).json({
         status: "success",
         data: {
            pedido: updateCart,
         },
        });
       
     }else {
      res.status(404).json({
        status: "not found",
      });
     }
  });

  exports.pagarCarrito = catchAsync(async (req, res) => {
    const carrito = await Cart.find();

    console.log(req.user);
    var query = {  status:  'PENDING', user: req.user.userName};
    const foundCart = await Cart.findOne(query);

    console.log(foundCart);
    foundCart.status = 'PAID';
    const cartResponse = await Cart.updateOne(query, foundCart);
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: carrito.length,
      data: {
        foundCart,
      },
    });
  });
