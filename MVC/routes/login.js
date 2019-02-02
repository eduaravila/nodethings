const express = require('express')
const path = require('path')
const login_controler = require('../controllers/users/login')

const routes = express.Router()



routes.get('/login',login_controler.getLogin)
routes.post('/login',login_controler.postLogin)


module.exports = routes;