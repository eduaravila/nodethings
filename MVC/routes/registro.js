const express = require('express')
const path = require('path')
const validar_registro_helper= require('../helpers/validador')
const registro_controler = require('../controllers/admin/registro')

const routes = express.Router()


routes.post('/registro',validar_registro_helper.validar_registro,registro_controler.postRegistro)
routes.get('/registro',registro_controler.getRegistro)


module.exports = routes;