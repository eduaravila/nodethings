const express = require('express')
const path = require('path')


const rootPath = require('../helpers/rootPath')

const routes = express.Router()

let productos = ['camaron','peña nieto en lata','mac book']

routes.get('/agregarProducto',(req,res,next)=> {
    res.sendFile(path.join(rootPath,'views','agregarProducto.html'))
})
routes.post('/nuevoproducto',(req,res,next)=> {
    let {producto} = req.body
    console.log(producto);
    
    productos = [...productos,producto]
    console.log(productos);
    
module.exports={
    routes,
    productos
}
    res.redirect('/')  
})

module.exports={
    routes,
    productos
}
