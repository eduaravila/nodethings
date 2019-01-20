
const express = require('express')
const path = require('path')

const controller_productos = require('../controllers/users/productos')
const routes = express.Router()


routes.post('/producto',(req,res,next) => {
    console.log(req.body);
    res.redirect(`/producto/?nombre=${req.body.nombre}`)
})

routes.get('/producto',(req,res,next) => {
    console.log(req.query);
    res.render('edicionProducto',{productos:productos.getProductos(),tituloPagina:"Editar Producto",activeUrl:"/admin/misproductos", path:'/productos'})
})

module.exports=routes