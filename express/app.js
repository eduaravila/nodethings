const express = require('express')
const app = express()
const bodyP = require('body-parser')

const index = require('./routes/index')
const productos = require('./routes/listaProductos')
const agregarProducto = require('./routes/agregarProductos')

const PORT = process.env.PORT || 3000

app.set('view engine','pug')
app.use(bodyP.urlencoded({extended:false}))
app.use(index)
app.use(productos)
app.use(agregarProducto.routes)

app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
