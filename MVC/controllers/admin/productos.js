const Producto = require('../../models/productos').Producto
const productos = new Producto()

const getAgregarProducto = (req, res, next) => {
	res.render('agregarProducto', {
		tituloPagina: 'Nuevo producto',
		activeUrl: '/agregarProducto',
		path: '/admin/agregar'
	})
}

const postNuevoProducto = (req, res, next) => {
	let { nombre, cantidad, imagen, precio } = req.body
console.log("nueiv",imagen);

	productos.agregarProducto({ nombre, cantidad, imagen, precio })

	// exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
	res.redirect('/')
}
const edicionProducto = (req, res, next) => {
	console.log(req.query)
	res.render('edicionProducto', {
		productos: productos.getProductos(),
		tituloPagina: 'Editar Producto',
		activeUrl: '/admin/misproductos',
		path: '/productos'
	})
}
const detallesProducto = (req, res, next) => {
	let id = req.params.id
	productos.obtenerProducto(id, (producto) => {
		res.render('detalles', {
			producto,
			tituloPagina: 'Editar Producto',
			activeUrl: '/admin/misproductos',
			path: '/productos'
		})
	})
}

module.exports = {
	getAgregarProducto,
	postNuevoProducto,
	productos,
	edicionProducto,
	detallesProducto
}
