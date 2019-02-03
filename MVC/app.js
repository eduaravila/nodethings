const express = require('express')
const app = express()
const bodyP = require('body-parser')
const path = require('path')
const ejs = require('ejs')
const usuario = require('./models/usuarios').usuarios
const cp = require('cookie-parser')


const index = require('./routes/index')
const login = require('./routes/login')
const productos = require('./routes/listaProductos')
const agregarProducto = require('./routes/agregarProductos')
const carrito = require('./routes/carrito')
const editarProducto = require('./routes/editarProducto')
const misProductos = require('./routes/misProductos')
const conexion = require('./db/conexion').conexion
const jwt_helper = require('./helpers/jwt')
const PORT = process.env.PORT || 3000

let userEduardo = new usuario({
	alias: 'Eduardo',
	mail: 'jesus@ejemplo.com',
	carrito: {
		items: [],
		caduca: new Date()
	}
})
app.use(cp()) // * cookie parser

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

app.use('/tienda/*',async (req,res,next) => {
	try{
	let sesion = !!req.cookies.usuario && req.cookies.usuario;		
	console.log(sesion);
	
	let {logeado} = await jwt_helper.desifrarToken(sesion)
	
	
	if(logeado){
		console.log('Logeado');
		
		next()
	}
	else{
		console.log('Invalido');
		res.redirect('/login')
		
	}
}
catch(err){
	console.log(err);
	
}
})

app.set('view engine', 'ejs')
app.use(bodyP.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/tienda/admin', agregarProducto.routes)
app.use('/tienda/admin', misProductos.routes)
app.use('/tienda/admin', editarProducto)
app.use('/tienda',index)
app.use(login)
app.use('/tienda',productos)
app.use('/tienda',carrito.routes)

app.use((req, res, next) => {
	res.render('404', { tituloPagina: '404!', path: '/404' })
})

conexion().then(() => {
	app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
})
