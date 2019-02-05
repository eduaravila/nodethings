const express = require('express')
const path = require('path')

const registro_controler = require('../controllers/admin/registro')

const routes = express.Router()


routes.post('/registro',registro_controler.postRegistro)
routes.get('/registro',registro_controler.getRegistro)


module.exports = routes;