const express = require('express')
const app = express()
const bodyP = require('body-parser')
const path = require('path')
const ejs = require('ejs')

const index = require('./routes/index')
const productos = require('./routes/listaProductos')
const agregarProducto = require('./routes/agregarProductos')

const PORT = process.env.PORT || 3000


app.set('view engine','ejs')
app.use(bodyP.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',agregarProducto.routes)
app.use(index)
app.use(productos)

app.use((req,res,next)=> {
    res.render('404', {pageTitle:"404!"})
})
app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
