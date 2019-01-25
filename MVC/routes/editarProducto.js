const express = require('express')
const path = require('path')

const controller_productos = require('../controllers/admin/productos')
const routes = express.Router()


routes.get('/producto/editar/:id',controller_productos.edicionProducto)

// routes.get('/producto',controller_productos.edicionProducto)

module.exports = routes
