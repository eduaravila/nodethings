const real = require('../../helpers/string')
const jwt_helper = require('../../helpers/jwt')
const usuario_model = require('../../models/usuarios').usuarios
const sesion_model = require('../../models/sesion')
const mail_helper = require('../../helpers/mailer')
const mensaje_helper = require('../../helpers/mensajes')
let error = new mensaje_helper()
const getLogin = (req, res, next) => {
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
			error: mensaje,			
		})
	}
}
const postLogout = async (req, res, next) => {
	try {
		let sesion = req.cookies.sesion
		let token = await jwt_helper.desifrarToken(sesion)
		console.log('token', token)
		await sesion_model.findOneAndDelete({ usuario: token.user._id })

		res.redirect('/')
	} catch (err) {
		console.log(err)

		res.redirect('/')
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
		error.setMensaje('error', 'Usuario incorrecto')
		console.log('mmmm', err)
		res.redirect('/')
	}
}
const getReset = async (req, res, next) => {
	let mensaje = null
	if (error.existe('error')) {
		mensaje = error.getMensaje('error')
	}
	res.render('passresset', {
		bienvenida: 'Recuperar contraseña',
		tituloPagina: 'Recuperar contraseña',
		activeUrl: '/reset',
		path: '/reset',
		error: mensaje
	})
}
const postReset = async (req, res, next) => {
	let mensaje = null
		if (error.existe('error')) {
			mensaje = error.getMensaje('error')
		}
	try {
		let { mail } = req.body
		let tokenR = await new jwt_helper({ mail }).crearToken_password()
		mail_helper.enviar_mail({
			mail,
			subject: 'Recuperar contraseña',
			text: 'Ingresa a la liga para recuperar tu contraseña',
			html: `<a href="http://localhost:3000/setNew/${tokenR}">Reiniciar contraseña</a>`
		})
		await usuario_model.findOneAndUpdate(
			{ correo: mail },
			{ $set: { resetToken: tokenR } }
		)
		res.render('mensaje', {
			bienvenida: 'Recuperar contraseña',
			tituloPagina: 'Recuperar contraseña',
			activeUrl: '/reset',
			path: '/reset',
			error: mensaje,
			mensaje:
				'Reviza tu bandeja de entrada e ingresa a la liga que se te envio'
		})
	} catch (err) {
		error.setMensaje('error', 'Token invalido')
		console.log(err)
		res.redirect('/reset')
	}
}
const getNuevoPassword = async (req,res,next)=> {
	let mensaje = null
		if (error.existe('error')) {
			mensaje = error.getMensaje('error')
		}
	try{
		let tokenUrl = req.params.tk;
		let usuario = await jwt_helper.desifrarToken(tokenUrl) // ? el token aun no se caduca
		let busqueda = await usuario_model.findOne({$and:[{resetToken:tokenUrl},{correo:usuario.mail} ] })
		if(!busqueda){
			throw new Error('Token invalido')
		}
		console.log(busqueda);
		
		res.render('nuevoPassword',{
			bienvenida: 'Recuperar contraseña',
			tituloPagina: 'Recuperar contraseña',
			activeUrl: '/reset',
			path: '/reset',
			error: mensaje,	
			url:`/setNew/${tokenUrl}`		
		})
	}
		catch(err){
			res.render('mensaje', {
				bienvenida: 'Recuperar contraseña',
				tituloPagina: 'Recuperar contraseña',
				activeUrl: '/reset',
				path: '/reset',
				error: mensaje,
				mensaje:
					'el token esta caducado'
			})
			console.log(err);
			
		}
}
const postNuevoPassword =async (req,res,next)=> {
	let mensaje = null
		if (error.existe('error')) {
			mensaje = error.getMensaje('error')
		}
	try{
		let {contraseña,contraseñaR} = req.body
		let tokenUrl = req.params.tk;
		
		let usuario = await jwt_helper.desifrarToken(tokenUrl) // ? el token aun no se caduca
		console.log(tokenUrl);
		await usuario_model.encriptar_password(contraseña,usuario.mail)
		
		res.render('mensaje', {
			bienvenida: 'Recuperar contraseña',
			tituloPagina: 'Recuperar contraseña',
			activeUrl: '/reset',
			path: '/reset',
			error: mensaje,
			mensaje:
				'Vuelve a iniciar sesion con tu nueva contraseña'
		})
	}
		catch(err){
			res.render('mensaje', {
				bienvenida: 'Recuperar contraseña',
				tituloPagina: 'Recuperar contraseña',
				activeUrl: '/reset',
				path: '/reset',
				error: mensaje,
				mensaje:
					'Esta url esta caducada'
			})
			console.log(err);
			
		}
}
module.exports = {
	getLogin,
	postLogin,
	postLogout,
	postReset,
	getReset,
	getNuevoPassword,
	postNuevoPassword
}
