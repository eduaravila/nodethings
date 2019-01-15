const express = require('express')
const path = require('path')

const rootPath = require('../helpers/rootPath')

const routes = express.Router()

//* indice de la pagina
routes.get('/',(req,res,next)=> {
    res.render('index',{bienvenida:"Bienvenido a el catalogo de productos"})
})


module.exports = routes;