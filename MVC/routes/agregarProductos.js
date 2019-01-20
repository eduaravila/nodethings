const express = require('express')
const path = require('path')


const controller_productos = require('../controllers/admin/productos')

const routes = express.Router()


routes.get('/agregar',controller_productos.getAgregarProducto)

routes.post('/nuevoproducto',controller_productos.postNuevoProducto)

exports.routes=routes;


