
const express = require('express')
const path = require('path')

const routes = express.Router()



routes.get('/productos',(req,res,next)=> {
    const productos = require('./agregarProductos').productos
    
    res.render('productos',{productos})
})

module.exports=routes