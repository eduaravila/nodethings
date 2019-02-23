const pedidos = require('../../models/ordenes').pedidos
const sesion_model = require('../../models/sesion')
const usuarios_model = require('../../models/usuarios').usuarios
const moment = require('moment')

const getCarrito = async (req, res, next) => {
	try{
	let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
	let total = await user.obtenerTotal

	let resultado = await user.traducirCarro

	if (!resultado) {
		res.render('carrito', {
			tituloPagina: 'carrito',
			path: '/carrito',
			productos: [],
			total
		})
	} else {
		res.render('carrito', {
			tituloPagina: 'carrito',
			path: '/carrito',
			productos: resultado,
			total
		})
		}
	}
	catch(err){
		let error = new Error(err)
		next(error)
	}

}
const postEliminarProducto = async (req, res, next) => {
	try {
		let { id } = req.body
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		let resultado = await user.traducirCarro
		await user.eliminarProducto(id, resultado)
		res.redirect('/tienda/carrito');
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}
const postRealizarCompra = async (req, res, next) => {
	try {
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		let resultado = await user.traducirCarro

		await new pedidos({
			usuario: user._id,
			productos: resultado,
			inicio: new Date(),
			fin: new Date()
		}).save()

		await user.limpiarCarrito()
		res.redirect('/tienda/carrito')
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}

const postCarrito = async (req, res, next) => {
	try {
		let { id } = req.body
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		await user.agregarCarro(id)
		res.redirect('/tienda')
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}
const getPedidos = async (req, res, next) => {
	try {
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		let resultado = await pedidos.find({ usuario: user._id })

		res.render('pedidos', {
			pedidos: resultado,
			path: '/pedidos',
			tituloPagina: 'Mis pedidos',
			moment
		})
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}

module.exports = {
	// compras,
	getCarrito,
	postCarrito,
	postEliminarProducto,
	postRealizarCompra,
	getPedidos
}
