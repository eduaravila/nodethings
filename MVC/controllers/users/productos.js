const producto = require('../../models/productos').productos
const MAX_PRODUCTOS = 3
const getProductos = async (req, res, next) => {
	try {
		let  p= +req.query.p || 1
		console.log(p,req.query);
		
		let productos = await producto
			.find({})
			.skip((p - 1) * MAX_PRODUCTOS)
			.limit(MAX_PRODUCTOS)
		let total_productos = await producto.find({}).countDocuments()

		res.render('productos', {
			actual_elemento: p,
			existe_siguiente: p * MAX_PRODUCTOS < total_productos,
			existe_anterior: p > 1,
			anterior_elemento: p - 1,
            siguiente_elemento: p + 1,
            primer_elemento:1,
			ultimo_elemento: Math.ceil(total_productos / MAX_PRODUCTOS),
			productos,
			tituloPagina: 'productos',
			activeUrl: '/productos',
			path: '/productos'
		})
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	getProductos
}
