
const express = require('express')
const path = require('path')

const controller_productos  = require('../controllers/users/productos')
const controller_productos_admin  = require('../controllers/admin/productos')
const productos = require('../controllers/admin/productos').productos
const routes = express.Router()


routes.get('/productos',controller_productos.getProductos)
routes.get('/producto/:id',controller_productos_admin.detallesProducto)
module.exports=routes