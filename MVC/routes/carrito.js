const express = require('express')
const path = require('path')

const routes = express.Router()
const controller_compras = require('../controllers/admin/compras')

routes.get('/carrito',(req,res,next)=> {
    res.render('carrito',{tituloPagina:'carrito',path:'/carrito',productos:['uno','dos','tres']})
})
routes.post('/realizarcompra',(req,res,next)=> {
    res.render('carrito',{tituloPagina:'carrito',path:'/carrito',productos:['uno','dos','tres']})
})



exports.routes=routes;


