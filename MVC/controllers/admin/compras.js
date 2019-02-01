
const pedidos = require('../../models/ordenes').pedidos
const moment = require('moment')

const getCarrito = async (req, res, next) => {
	let total = req.user.carrito.total;
    console.log(total);
    let resultado = await req.user.traducirCarro
    console.log(resultado);
    
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
const postEliminarProducto = async (req, res, next) => {
    try{
    let { id } = req.body 
	let resultado = req.user.traducirCarro
	await req.user.eliminarProducto(id,resultado)
    
}
catch(err){
	console.log(err);
	
}
}
const postRealizarCompra = async (req, res, next) => {
    try{
    
	let resultado = await req.user.traducirCarro
	   console.log(req.user);
	   
	await new pedidos({usuario:req.user._id, productos:resultado,inicio:new Date(),fin:new Date()}).save()
	
	await req.user.limpiarCarrito();
		res.redirect('/carrito')
    }
    catch(err){
        console.log(err);
        
    }
}

const postCarrito = async (req, res, next) => {
    try{
    let { id } = req.body
    console.log('id',id);
    
    await req.user.agregarCarro(id)
    res.redirect('/');
    }
    catch(err){
        console.log(err);
        
    }
}
const getPedidos = async (req,res,next) => {
	try{
		let resultado  = await pedidos.find({usuario:req.user._id})
		console.log('Pedidos',resultado);
		res.render('pedidos',{
			pedidos:resultado,			
			path: '/pedidos',							
			tituloPagina: 'Mis pedidos',
			moment
		})
		
	}
	catch(err){
		console.log(err);
		
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
