const express = require('express')
const path = require('path')

const routes = express.Router()

//* indice de la pagina
routes.get('/',(req,res,next)=> {
    res.sendFile(path.join(__dirname,'../','views','index.html'))
})


module.exports = routes;