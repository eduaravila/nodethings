const express = require('express')
const path = require('path')
const login_controler = require('../controllers/users/login')
const volver_index = require('../helpers/volver_index.js')
const routes = express.Router()



routes.get('/login',volver_index,login_controler.getLogin)
routes.get('/',volver_index,login_controler.getLogin)
routes.post('/login',login_controler.postLogin)
routes.post('/logout',login_controler.postLogout)
routes.get('/reset',login_controler.getReset)
routes.post('/reset',login_controler.postReset)
routes.post('/setNew/:tk',login_controler.postNuevoPassword)
routes.get('/setNew/:tk',login_controler.getNuevoPassword)


module.exports = routes;