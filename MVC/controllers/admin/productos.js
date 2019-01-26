const Producto = require('../../models/productos').Producto
const productos = new Producto()

const getAgregarProducto = (req, res, next) => {
	res.render('editarProducto', {
		tituloPagina: 'Nuevo producto',
		activeUrl: '/agregarProducto',
		path: '/admin/agregar',
		editar: false,
		nombre: "",
		precio: "",
		cantidad: "",
		imagen: "",
		id:""
	})
}

const postNuevoProducto = (req, res, next) => {
	let { nombre, cantidad, imagen, precio } = req.body
	console.log('nueiv', imagen)

	productos.agregarProducto({id:null, nombre, cantidad, imagen, precio },(res)=> {
		console.log(res);
		
	})

	// exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
	res.redirect('/')
}
const edicionProducto = (req, res, next) => {
	let { id } = req.params
	let { editar } = req.query
	console.log('query, id',id,editar);
	if(editar =="true"){
	productos.obtenerProducto(+id, (resultado) => {
		res.render('editarProducto', {
			tituloPagina: 'Editar Producto',
			activeUrl: '/admin/misproductos',
			path: '/admin/agregar',
			editar,
			nombre: resultado.nombre,
			precio: resultado.precio,
			cantidad: resultado.cantidad,
			imagen: resultado.imagen,
			id:resultado.id
		})
	})
}
else{
	res.redirect('/')
}
}

const postActualizarProducto = (req, res, next) => {
	let {id,nombre,cantidad,imagen,precio} = req.body;
	productos.agregarProducto({id, nombre, cantidad, imagen, precio },(result)=> {
		console.log(result);
		res.redirect('/')
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
	detallesProducto,
	postActualizarProducto
}
