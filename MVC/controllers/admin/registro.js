const validator = require('validator')
const { validationResult } = require('express-validator/check')

const real = require('../../helpers/string')
const usuario_model = require('../../models/usuarios').usuarios
const mensaje_helper = require('../../helpers/mensajes')
let error = new mensaje_helper()

const postRegistro = async (req, res, next) => {
	try {
		let { correo, usuario, contraseña, contraseñaR } = req.body

		const errors = validationResult(req)
		console.log('errores', errors.isEmpty(), errors.array())

		if (!errors.isEmpty()) {
			let mensaje = null
            
            error.setMensaje('error', [...errors.array().map(i=>i.msg+'||||')])

			if (error.existe('error')) {
				mensaje = error.getMensaje('error')
			}
			res.status(422).render('registro', {
				bienvenida: 'Registrarse a la mejor plataforma de compras',
				tituloPagina: 'Registro',
				activeUrl: '/registro',
				path: '/registro',
				error: mensaje,
				validator,
				cacheInput: {
					correo,
					usuario,
					contraseña,
					contraseñaR
				},
				errorsInput: errors.array()
			})
			
		}
        else{
		let nuevoUsuario = new usuario_model({
			correo,
			usuario,
			contraseña,
			resetToken: ''
		})
		await nuevoUsuario.save()
		// mail_helper.enviar_mail(correo);
        res.redirect('/')
    }
	} catch (err) {
		console.log(err)
		let mensaje = !!err.message && err.message + (!!err.errmsg && err.errmsg)
		error.setMensaje('error', mensaje)
		// res.redirect('/registro')
	}
}
const getRegistro = (req, res, next) => {
	let mensaje = null

	if (error.existe('error')) {
		mensaje = error.getMensaje('error')
	}
	res.render('registro', {
		bienvenida: 'Registrarse a la mejor plataforma de compras',
		tituloPagina: 'Registro',
		activeUrl: '/registro',
		path: '/registro',
		error: mensaje,
		validator,
		cacheInput: {
			correo: '',
			usuario: '',
			contraseña: '',
			contraseñaR: ''
		},
		errorsInput: []
	})
}

module.exports = {
	postRegistro,
	getRegistro
}
