const Compra = require('../../models/compras').Compra
const compras = new Compra()

const getCarrito = (req, res, next) => {
	let total = compras.obtenerTotal()
	compras.traducirCompras((err, resultado) => {
        
        
		if (err) {
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
	})
}
const postEliminarProducto = (req, res, next) => {
    let { id } = req.body
    console.log(id);
    
	compras.eliminarProducto(id, (resultado) => {
		res.redirect('/carrito')
	})
}

const postCarrito = (req, res, next) => {
	let { id } = req.body
	compras.agregarProducto(id, (resultado) => {
		console.log(resultado)
		res.redirect('/')
	})
}

module.exports = {
	compras,
	getCarrito,
	postCarrito,
	postEliminarProducto
}
