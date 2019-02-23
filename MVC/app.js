const express = require('express')
const app = express()
const bodyP = require('body-parser')
const path = require('path')
const csrf = require('csurf')
const cp = require('cookie-parser')


const index = require('./routes/index')
const login = require('./routes/login')
const registro = require('./routes/registro')
const productos = require('./routes/listaProductos')
const agregarProducto = require('./routes/agregarProductos')
const carrito = require('./routes/carrito')
const editarProducto = require('./routes/editarProducto')
const misProductos = require('./routes/misProductos')
const conexion = require('./db/conexion').conexion
const jwt_helper = require('./helpers/jwt')
const sesion_model = require('./models/sesion')

const PORT = process.env.PORT || 3000



app.set('view engine', 'ejs')
app.use(bodyP.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cp()) // * cookie parser

app.use(csrf({ cookie: true })) // ? el orden en donde se pone la libreia importa

app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken()
	res.locals.login = false;
	
	next()
})
app.use((error,req,res,next)=>{
	res.status(500).render('500')
})
app.all(/\/tienda|\/tienda\/\*/, async (req, res, next) => {
	try {
		let token = req.cookies.sesion
		console.log(token)
		
		let usuario = await jwt_helper.desifrarToken(token)
		console.log('usuario', usuario)
		let sesion = await sesion_model.findOne({ usuario: usuario.user._id })
		
		console.log('sesion', sesion)

		if (sesion) {
			console.log(sesion)
			req.sesion = sesion
			res.locals.login = true;
			next()
		} else {
			res.redirect('/login')
			res.locals.login = false;
		}
	} catch (err) {
		console.log(err)
		res.redirect('/login')
		res.locals.login = false;
	}
})



app.use('/tienda/admin', agregarProducto.routes)
app.use('/tienda/admin', misProductos.routes)
app.use('/tienda/admin', editarProducto)
app.use('/tienda', index)
app.use(login)
app.use(registro)
app.use('/tienda', productos)
app.use('/tienda', carrito.routes)

app.use((req, res, next) => {
	res.render('404', { tituloPagina: '404!', path: '/404' })
})

conexion().then(() => {
	app.listen(PORT, () => console.log('escuchando desde el puerto ', PORT))
})
