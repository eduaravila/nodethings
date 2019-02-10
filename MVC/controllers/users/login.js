const real = require('../../helpers/string')
const jwt_helper = require('../../helpers/jwt')
const usuario_model = require('../../models/usuarios').usuarios
const sesion_model = require('../../models/sesion')
const mensaje_helper = require('../../helpers/mensajes')
let error = new mensaje_helper()
const getLogin = (req, res, next) => {
	console.log(req.cookie.ingreso)

	if (req.ingreso) {
		res.redirect('/tienda')
	} else {
		let mensaje = null

		if (error.existe('error')) {
			mensaje = error.getMensaje('error')
		}
		res.render('login', {
			bienvenida: 'Ingresar a la tienda de TUMATADOR',
			tituloPagina: 'Login',
			activeUrl: '/login',
			path: '/login',
			error: mensaje
		})
	}
}

const postLogin = async (req, res, next) => {
	try {
		let { usuario, contraseña } = req.body
		if (real.stringReal(usuario) && real.stringReal(contraseña)) {
			let user = await usuario_model.comprobar(usuario, contraseña)
			console.log(user)

			if ((user.usuario = usuario)) {
				console.log('usuario --->', user)
				let sesion = await new jwt_helper({ user }).crearToken()
				res.cookie('sesion', sesion)
				await new sesion_model({ usuario: user._id }).save()
				if (user) {
					res.redirect('/tienda')
				} else {
					res.redirect('/login')
				}
			} else {
				console.log('password invalido', user)

				res.redirect('/login')
			}
		} else {
			error.setMensaje('error', 'Entradas invalidas')
			console.log('entradas invalidad')

			res.redirect('/login')
		}
	} catch (err) {
		error.setMensaje('error', err)
		console.log('mmmm', err)
		res.redirect('/')
	}
}

module.exports = {
	getLogin,
	postLogin
}
