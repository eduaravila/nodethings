const express = require('express')
const path = require('path')


const rootPath = require('../helpers/rootPath')

const routes = express.Router()

let productos = []

routes.get('/agregarProducto',(req,res,next)=> {
    res.render('agregarProducto',{tituloPagina:"Nuevo producto",activeUrl:"/agregarProducto",agregarProducto:true,producto:false})
})
routes.post('/nuevoproducto',(req,res,next)=> {
    let {producto} = req.body
    
    productos.push(producto)
    
    // exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
    res.redirect('/')  
})

exports.routes=routes;
exports.productos=productos;

