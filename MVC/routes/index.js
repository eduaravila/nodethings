const express = require('express')
const path = require('path')



const routes = express.Router()

//* indice de la pagina
routes.get('/',(req,res,next)=> {
    res.render('index',{bienvenida:"Bienvenido a el catalogo de productos",tituloPagina:"Nuevo producto",activeUrl:"/",agregarProducto:false,producto:false})
})


module.exports = routes;