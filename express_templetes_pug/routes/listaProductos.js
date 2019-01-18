
const express = require('express')
const path = require('path')

const routes = express.Router()

const productos = require('./agregarProductos')

routes.get('/productos',(req,res,next)=> {
    
    console.log(productos.productos);
    
    res.render('productos',{productos:productos.productos,tituloPagina:"productos",activeUrl:"/productos"})
})

module.exports=routes