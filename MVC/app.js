const express = require('express')
const app = express()
const bodyP = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const usuario = require('./models/usuarios').usuarios

const index = require('./routes/index')
const productos = require('./routes/listaProductos')
const agregarProducto = require('./routes/agregarProductos')
const carrito = require('./routes/carrito')
const editarProducto = require('./routes/editarProducto')
const misProductos = require('./routes/misProductos')
const conexion = require('./db/conexion').conexion

const PORT = process.env.PORT || 3000

let userEduardo = new usuario({
	alias: 'Eduardo',
	mail: 'jesus@ejemplo.com',
	carrito: {
		items: [],
		caduca: new Date()
	}
})
app.use(async (req, res, next) => {
	try {                
        let user = await usuario.findById('5c5250d07806b905d8430c69')
        if(!user){
             await userEduardo.save()
             req.user = user
        }
        else{
            req.user = user
        }
		
	} catch (err) {
		console.log(err)
    }
    next()
})
app.set('view engine', 'ejs')
app.use(bodyP.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', agregarProducto.routes)
app.use('/admin', misProductos.routes)
app.use('/admin', editarProducto)
app.use(index)
app.use(productos)
app.use(carrito.routes)

app.use((req, res, next) => {
	res.render('404', { tituloPagina: '404!', path: '/404' })
})

conexion().then(() => {
	app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
})
