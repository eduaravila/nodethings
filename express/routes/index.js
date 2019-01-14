const express = require('express')
const path = require('path')

const rootPath = require('../helpers/rootPath')

const routes = express.Router()

//* indice de la pagina
routes.get('/',(req,res,next)=> {
    res.sendFile(path.join(rootPath,'views','index.html'))
})


module.exports = routes;