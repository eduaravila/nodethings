const express = require('express')
const app = express()
const bodyP = require('body-parser')
const path = require('path')
const csrf = require('csurf')
const cp = require('cookie-parser')
const multer = require('multer')
const uuid = require('uuid/v1')

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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, `${uuid()}-${file.originalname}`)
	}
})

const filtro = (req, file, cb) => {
	let tipos = ['image/png', 'image/jpg', 'image/jpeg']
	if (tipos.some((i) => i == file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}
app.set('view engine', 'ejs')
app.use(bodyP.urlencoded({ extended: false }))
app.use(multer({ storage, fileFilter: filtro }).single('imagen'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cp()) // * cookie parser
app.use(csrf({ cookie: true })) // ? el orden en donde se pone la libreia importa

app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken()
	res.locals.login = false

	next()
})
app.use((error, req, res, next) => {
	res
		.status(500)
		.render('500', { path: '/500', tituloPagina: '500', login: false })
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
			res.locals.login = true
			next()
		} else {
			res.redirect('/login')
			res.locals.login = false
		}
	} catch (err) {
		console.log(err)
		res.redirect('/login')
		res.locals.login = false
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
