const producto = require('../../models/productos').productos
const usuarios_model = require('../../models/usuarios').usuarios
// const compras = require('./compras').compras
const { validationResult } = require('express-validator/check')
const mensaje_helper = require('../../helpers/mensajes')
let error = new mensaje_helper()
const objectId = require('mongodb').ObjectID
const getAgregarProducto = (req, res, next) => {
	res.render('editarProducto', {
		tituloPagina: 'Nuevo producto',
		activeUrl: '/agregarProducto',
		path: '/admin/agregar',
		editar: false,
		nombre: '',
		precio: '',
		disponibles: '',
		descripcion: '',
		imagen: '',
		id: '',
		error: ''
	})
}

const postNuevoProducto = async (req, res, next) => {
	let { nombre, disponibles, descripcion, imagen, precio } = req.body

	let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
	new producto({
		nombre,
		disponibles,
		imagen,
		precio,
		descripcion,
		autor: user._id
	})
		.save()
		.then(() => console.log('Guardado con exito'))

	// exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
	res.redirect('/tienda')
}
const edicionProducto = async (req, res, next) => {
	try {
		let { id } = req.params
		let { editar } = req.query

		if (editar == 'true') {
			let resultado = await producto.findOne({ _id: new objectId(id) })
			res.render('editarProducto', {
				tituloPagina: 'Editar Producto',
				activeUrl: '/admin/misproductos',
				path: '/admin/agregar',
				editar,
				nombre: resultado.nombre,
				precio: resultado.precio,
				disponibles: resultado.disponibles,
				imagen: resultado.imagen,
				descripcion: resultado.descripcion,
				id: resultado._id,
				error: ''
			})
		} else {
			res.redirect('/tienda')
		}
	} catch (err) {
		console.log(err)
	}
}

const postActualizarProducto = async (req, res, next) => {
	try {
		let { nombre, precio, disponibles, imagen, descripcion, _id } = req.body

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let mensaje = null
			error.setMensaje('error', [...errors.array().map((i) => i.msg + '||||')])

			if (error.existe('error')) {
				mensaje = error.getMensaje('error')
			}

			res.status(422).render('editarProducto', {
				tituloPagina: 'Editar Producto',
				activeUrl: '/admin/misproductos',
				path: '/admin/agregar',
				editar: true,
				nombre: nombre,
				precio: precio,
				disponibles: disponibles,
				imagen: imagen,
				descripcion: descripcion,
				id: _id,
				error: mensaje
			})
		} else {
			let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
			let { id, nombre, disponibles, imagen, precio, descripcion } = req.body
			await producto.updateOne(
				{ _id: new objectId(id), autor: req.sesion.usuario },
				{ nombre, disponibles, imagen, precio, descripcion, autor: user._id }
			)
			res.redirect('/tienda')
		}
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}

const detallesProducto = async (req, res, next) => {
	try {
		let id = req.params.id
		let respuesta = await producto.findById(id)

		res.render('detalles', {
			producto: respuesta,
			tituloPagina: 'Editar Producto',
			activeUrl: '/admin/misproductos',
			path: '/productos'
		})
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}
const postEliminarProducto = async (req, res, next) => {
	try {
		let { id } = req.body
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		let resultado = await user.traducirCarro

		await user.eliminarProducto(id, resultado)
		await producto.deleteOne({
			_id: new objectId(id),
			autor: req.sesion.usuario
		})
		res.redirect('/tienda/admin/productos')
	} catch (err) {
		let error = new Error(err)
		next(error)
	}
}

const getMisProductos = async (req, res, next) => {
	try {
		let usuario = req.sesion.usuario
		let productos = await producto.find({ autor: usuario })
		res.render('misProductos', {
			productos,
			tituloPagina: 'Mis productos',
			activeUrl: '/admin/misproductos',
			path: '/admin/misproductos'
		})
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}

module.exports = {
	getAgregarProducto,
	postNuevoProducto,
	edicionProducto,
	detallesProducto,
	postActualizarProducto,
	postEliminarProducto,
	getMisProductos
}
