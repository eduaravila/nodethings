const moment = require('moment')
const pdfK = require('pdfkit')
const fs = require('fs')
const path = require('path')

const pedidos = require('../../models/ordenes').pedidos
const usuarios_model = require('../../models/usuarios').usuarios

const getCarrito = async (req, res, next) => {
	try {
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
	} catch (err) {
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
		res.redirect('/tienda/carrito')
	} catch (err) {
		let error = new Error(err)
		next(error)
		console.log(err)
	}
}
const postRealizarCompra = async (req, res, next) => {
	try {
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		await user.obtenerTotal
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
const getFactura = async (req, res, next) => {
	try {
		let { id } = req.params // *id de la factura en el url
		let user = await usuarios_model.findOne({ _id: req.sesion.usuario })
		let resultado = await pedidos.findOne({ _id: id }) // * buscas la orden por id
		if (resultado.usuario.toString() == user._id.toString()) {
			let nombre_factura = `factura-${resultado._id.toString()}.pdf`
			let pdf_path = path.join(__dirname,'..','..','data','facturas',nombre_factura)
			let pdf_c = new pdfK()
			res.setHeader('Content-Type','application/pdf')
			res.setHeader('Content-Disposition','inline;filename="'+pdf_path+'"')
			
			pdf_c.pipe(fs.createWriteStream(pdf_path)) // * escribe en el sistema
			pdf_c.pipe(res) //* lo envia a el cliente
			pdf_c.fontSize(24).text(`Factura ${resultado._id.toString()}`)
			pdf_c.fontSize(24).text('-----------')
			resultado.productos.map(i => {
				pdf_c.fontSize(12).text(`${i.nombre} -> ${i.qty} X ${i.precio}`)
			})
			pdf_c.fontSize(24).text('-----------')
			let total = resultado.productos.map(i=> i.qty * i.precio).reduce((a,b)=>a+b );
			pdf_c.fontSize(12).text(`Total ${total}`)
			pdf_c.end()
		} else {
			throw new Error('No tienes permitido ver esto!')
		}
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
	getPedidos,
	getFactura
}
