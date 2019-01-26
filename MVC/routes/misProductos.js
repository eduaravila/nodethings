const express = require('express')
const path = require('path')

const productos = require('../controllers/admin/productos').productos
// const controller_productos = require('../controllers/admin/productos')

const routes = express.Router()

routes.get('/productos',(req,res,next)=> {
    res.render('misProductos',{productos:productos.getProductos(),tituloPagina:"Mis productos",activeUrl:"/admin/misproductos", path:'/admin/misproductos'})
})
routes.post('/eliminar',(req,res,next)=> {
    let {id} = req.body;
    productos.eliminarProducto(id,(resultado) => {
        res.redirect('/admin/productos')
        console.log(resultado);
        
    })
})


exports.routes=routes;


