
// const compras = new Compra()

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
    let resultado = await req.user.traducirCarro   
        await req.user.eliminarProducto(id,resultado)
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

module.exports = {
	// compras,
	getCarrito,
	postCarrito,
	postEliminarProducto
}
