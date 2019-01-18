
const express = require('express')
const path = require('path')

const controller_productos  = require('../controllers/productos')
const routes = express.Router()


routes.get('/productos',controller_productos.getProductos)

module.exports=routes