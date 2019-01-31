const producto = require('../../models/productos').productos
// const compras = require('./compras').compras
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
		descripcion:'',
		imagen: '',
		id: ''
	})
}

const postNuevoProducto = (req, res, next) => {
	let { nombre, disponibles,descripcion, imagen, precio } = req.body
	console.log('nueiv', imagen)

	new producto({ nombre, disponibles, imagen, precio,descripcion,autor:req.user._id}).save()
	.then(()=> console.log('Guardado con exito'))


	// exports.productos=productos; // * volver a exportar el arreglo para ver los cambios al agregar un nuevo producto con el formualario
	res.redirect('/')
}
const edicionProducto = async (req, res, next) => {
	try{
	let { id } = req.params
	let { editar } = req.query
	console.log('query, id', id, editar)
	if (editar == 'true') {

		let resultado = await producto.findOne({_id:new objectId(id)})
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
				id: resultado._id				
			})

	} else {
		res.redirect('/')
	}
}
catch(err){
	console.log(err);

}
}

const postActualizarProducto = async (req, res, next) => {
	try{
	let { id, nombre, disponibles, imagen, precio,descripcion} = req.body
			await producto.updateOne({_id:new objectId(id)},{nombre,disponibles,imagen,precio,descripcion,autor:req.user._id})			
			res.redirect('/')
	}
	catch(err){
		console.log(err);		
	}
	
}

const detallesProducto = async(req, res, next) => {
	try{
	let id = req.params.id
	let respuesta = await producto.findById(id)

		res.render('detalles', {
			producto:respuesta,
			tituloPagina: 'Editar Producto',
			activeUrl: '/admin/misproductos',
			path: '/productos'

	})
}
catch(err){
	console.log(err);

}
}
const postEliminarProducto = async(req, res, next) => {
	let { id } = req.body
	let resultado = await req.user.traducirCarro   
	await req.user.eliminarProducto(id,resultado)
	producto.deleteOne({_id:new objectId(id)}).then(()=> {
		console.log("Eliminado con exito");
		res.redirect('/admin/productos')
	})
}

const getMisProductos =async (req, res, next) => {
	try{


	let productos = await producto.find()
	res.render('misProductos', {
		productos,
		tituloPagina: 'Mis productos',
		activeUrl: '/admin/misproductos',
		path: '/admin/misproductos'
	})
}
catch(err){
	console.log(err);

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
