
const express = require('express')
const path = require('path')

const controller_productos  = require('../controllers/users/productos')
const productos = require('../controllers/admin/productos').productos
const routes = express.Router()


routes.get('/productos',controller_productos.getProductos)
routes.get('/producto/:id',(req,res,next)=> {
    let id =  req.params.id;
    
    
    productos.obtenerProducto(id,(producto)=>console.log(producto))
    res.redirect('/')
})
module.exports=routes