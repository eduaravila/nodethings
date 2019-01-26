const express = require('express')
const app = express()
const bodyP = require('body-parser')
const path = require('path')
const ejs = require('ejs')

const index = require('./routes/index')
const productos = require('./routes/listaProductos')
const agregarProducto = require('./routes/agregarProductos')
const carrito = require('./routes/carrito')
const editarProducto = require('./routes/editarProducto')
const misProductos = require('./routes/misProductos')

const PORT = process.env.PORT || 3000


app.set('view engine','ejs')
app.use(bodyP.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',agregarProducto.routes)
app.use('/admin',misProductos.routes)
app.use('/admin',editarProducto)
app.use(index)
app.use(productos)
app.use(carrito.routes)


app.use((req,res,next)=> {
    res.render('404', {tituloPagina:"404!",path:'/404'})
})
app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
